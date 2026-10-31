# security_spec.md

## 1. Data Invariants

1. **Submission Creation Access**: Anyone (even unauthenticated prospective students) can create a counseling submission. This allows high conversion rates on the lander form.
2. **Access Protection**: Read (`get`, `list`), `update`, and `delete` operations on submissions are strictly blocked for general users. They are ONLY allowed for authorized Admins (`shaka.ahmadd@gmail.com`).
3. **Admin Identity Verification**: Admin checks require checking if `request.auth.token.email` equals the bootstrapped admin email AND `request.auth.token.email_verified` is strictly `true`, or checking details in a specialized `/admins` collection.
4. **Data Shape Integrity**:
    - `name` must be a string between 3 and 100 characters.
    - `email` must be a valid email structure and a string under 128 characters.
    - `phone` must be a string under 30 characters.
    - `city` must be one of the known offices ("Lahore", "Karachi", "Islamabad", "Dubai", "Riyadh", "Doha").
    - `service` must be a valid service type or general Academic Query.
    - `status` upon creation must be exactly `"NEW"`. It cannot be set to `"CONTACTED"` or `"RESOLVED"` directly.
    - `createdAt` must match `request.time` exactly.
5. **No ID Poisoning**: Submission path `submissionId` must conform to standard database rules (`isValidId`).

---

## 2. The "Dirty Dozen" Rogue Payloads & Security Violations

Here are 12 high-hazard JSON payloads attempting to violate user identity, integrity, state, or resources:

1. **Payload 01: Status Hijack (State Shortcutting on Create)**
   ```json
   {
     "name": "Attacker",
     "email": "attacker@spam.com",
     "phone": "+923000000000",
     "city": "Lahore",
     "service": "University Admissions",
     "status": "RESOLVED",
     "createdAt": "request.time"
   }
   ```
   *Result*: `PERMISSION_DENIED` because creation `status` must be `"NEW"` or omitted (with default rule validation checking matching exactly `"NEW"`).

2. **Payload 02: Timestamp Spoofing**
   ```json
   {
     "name": "Attacker",
     "email": "attacker@spam.com",
     "phone": "+923000000000",
     "city": "Lahore",
     "service": "University Admissions",
     "status": "NEW",
     "createdAt": "2019-01-01T00:00:00Z"
   }
   ```
   *Result*: `PERMISSION_DENIED` because `createdAt` must strictly match `request.time`.

3. **Payload 03: Denial of Wallet (Giant Field Injection)**
   ```json
   {
     "name": "AveryLongNameThatIsRepeatedToExhaustDatabaseLimitsAndDenialOfWalletAttacksForStorageBillExplosion...",
     "email": "attacker@spam.com",
     "phone": "+923000000000",
     "city": "Lahore",
     "service": "University Admissions",
     "status": "NEW",
     "createdAt": "request.time"
   }
   ```
   *Result*: `PERMISSION_DENIED` because `name.size() <= 100` constraint fails.

4. **Payload 04: Invalid Office Injection (Boundary Check Violation)**
   ```json
   {
     "name": "John Doe",
     "email": "john@gmail.com",
     "phone": "+923001234567",
     "city": "MaliciousCityNameHere",
     "service": "University Admissions",
     "status": "NEW",
     "createdAt": "request.time"
   }
   ```
   *Result*: `PERMISSION_DENIED` because `city` must be one of the pre-assigned locations.

5. **Payload 05: Unauthenticated List Harvesting (Scraping Threat)**
   *Scenario*: Unauthenticated client attempts a full database scan query on `/submissions`.
   *Result*: `PERMISSION_DENIED`.

6. **Payload 06: Spoofed Admin Email (No Verification)**
   *Scenario*: User logs in with a self-created custom provider, setting email to `shaka.ahmadd@gmail.com` but with `email_verified` of `false` inside the token.
   *Result*: `PERMISSION_DENIED` during read or update checks.

7. **Payload 07: Rogue Update (General User Editing Submissions)**
   *Scenario*: general user attempts to change their own or other submissions.
   *Result*: `PERMISSION_DENIED`.

8. **Payload 08: Missing Required Key (Null bypass)**
   ```json
   {
     "name": "Hassan",
     "city": "Karachi",
     "status": "NEW",
     "createdAt": "request.time"
   }
   ```
   *Result*: `PERMISSION_DENIED` because `email` and `phone` are mandatory keys (`keys().hasAll(...)`).

9. **Payload 09: Malicious ID Poisoning Guard**
   *Scenario*: Request targeting `submissions/malicious$$char$$injection$$id` where ID exceeds safe bounds or contains illegal URL symbols.
   *Result*: `PERMISSION_DENIED` via `isValidId()` target.

10. **Payload 10: Admin State Mutability Override Violation**
    *Scenario*: Attempting to update a submission's `createdAt` or change the `email` afterwards.
    *Result*: `PERMISSION_DENIED` because `createdAt` and user identification parameters are immutable after submission setup.

11. **Payload 11: Non-Standard Status Transition**
    *Scenario*: Attempting to update status to an invalid state, e.g. `"SPAM_BOT"`.
    *Result*: `PERMISSION_DENIED` because update validator restricts status options purely to `["NEW", "CONTACTED", "RESOLVED", "DELETED"]`.

12. **Payload 12: Direct SQL-Injected or Code-Laden Message Payload**
    ```json
    {
      "name": "Malicious",
      "email": "mal@hack.com",
      "phone": "+1234",
      "city": "Dubai",
      "service": "University Admissions",
      "message": "DROP TABLE submissions; <script>window.location.href='...'</script>",
      "status": "NEW",
      "createdAt": "request.time"
    }
    ```
    *Result*: While stored as text, validation checks limit string field lengths to prevent injection or overflow stress.

---

## 3. The Test Suite Configuration (firestore.rules.test.ts)

This outlines our test criteria verifying the defenses against the payloads above:

```typescript
// Test suites for firebase.rules testing:
describe("Universal Counsel Submission Pipeline Security", () => {
  it("allows anonymous guest users to register a clean submission with status 'NEW' at correct server times", () => {
     // Success creation test
  });

  it("blocks status hijack on creation (fails if status set to RESOLVED directly)", () => {
     // Expect PERMISSION_DENIED
  });

  it("denies list/get requests for non-admins and handles it gracefully", () => {
     // Expect PERMISSION_DENIED for arbitrary reads
  });

  it("grants full list, get, and update states to authenticated shaka.ahmadd@gmail.com provided verified holds", () => {
     // Expect ALLOW for authentic admin credentials
  });
});
```
