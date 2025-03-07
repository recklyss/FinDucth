
# Claude - before design

Design an app for me, output the HTML prototype and the diagrams for frontend functionalities and output API design documents for backend service:

Major requirements:
- **Expense Management**  
- **Group Management**  
- **Debt Tracking & Settlement**  
- **User Authentication & Security**  
- **APIs & Integrations**  
- **Accessibility & Localization**  

The UI will be very different with normal APPs, the app only has one major UI which is like a message box, user can type something in the input and the application will respond.
And the app with based on AI to analyze user's input and execute functions like record user's expense or split bill with others. To make it easier, we have some pre-defined commands like

```text
- add_friend (for user to add a new friend in their contact)
- group (for user to manage group, can add or delete)
- record (record a bill which include how much money and within which group, also the subjects like who owns who, and the currency)
- finalize (calculate the final result, how much money I own who, or who owns me money)
```

Users could type in natural language and AI will analyse and record it into database. Within the whole process, the app is acting an AI assistant and when user didn't provided enough information, it will ask more information .

For example:
- User type `/record I spent 200 baht with @Jack and @Mark in group #camp-2025-03-09` (use `@`can tag friend and use `#` can specify which group)
- And APP will ask, do you want to split even?
- And user respond `yes` and it will process and store into database
- And when user type `/finalize` the app will list how much money he needs to pay to (e.g. Jack or Mark) or Mark needs to pay to him


---


### **Finalized Requirements for "FinDucth"**  
An AI-driven chat-style app for expense splitting, group management, and debt tracking. Users interact via natural language or predefined slash commands in a minimalist message-box interface.  

---

### **Core Features & Scope**  
#### **AI-Driven Interaction**  
- **Single UI**: Chat-like interface where users type commands (e.g., `/record`, `/finalize`).  
- **Natural Language Processing (NLP)**:  
  - Parse user inputs (e.g., `/record I paid 2000 JPY for dinner with @Alice and @Bob in #TokyoTrip`).  
  - Auto-detect missing info (e.g., currency, split method) and prompt users (e.g., *"How should we split this expense?"*).  
- **Predefined Commands**:  
  ```text
  /add_friend [@username]  
  /group [create/delete] [#groupname]  
  /record [amount] [description] [@users] [#group] [currency?]  
  /finalize [#group?]  
  /help  
  ```

#### **Expense Management**  
- Record expenses with:  
  - Amount, currency (auto-detect or specify).  
  - Participants (tagged via `@`).  
  - Group association (tagged via `#`).  
- Split logic: Equal, percentage, or custom splits (AI infers from context).  
- Multi-currency support with real-time conversion.  

#### **Group Management**  
- Create/delete groups (e.g., `/group create #BaliVacation` or `./group delete #BaliVacation`).  

#### **Debt Tracking & Settlement**  
- Auto-calculate net balances per user/group.  
- `/finalize` command generates a summary (e.g., *"You owe @Alice $30 in #BaliVacation"*).  

#### **User Authentication & Security**  
- Email/social login with JWT tokens.  
- End-to-end encryption for messages.  
- Input sanitization to prevent injection attacks.  

#### **APIs & Integrations**  
- RESTful APIs for:  
  - Command processing.  
  - Currency conversion (e.g., integrate with Open Exchange Rates).  
- Webhooks for notifications (e.g., debt reminders).  

#### **Accessibility & Localization**  
- Multi-language support (auto-detect or set via `/language en`).  
- Screen-reader-friendly UI.  
- Regional formatting (e.g., currencies, dates).  

---

### **Edge Cases & Validation**  
- **Missing Data**: AI prompts for missing fields (e.g., *"Which group is this for?"*).  
- **Multi-Currency**: Convert all debts to a user’s default currency.  
- **Group Removal**: Handle debts when a user is removed from a group.  
- **Command Typos**: Suggest corrections (e.g., *"Did you mean /record?"*).  


