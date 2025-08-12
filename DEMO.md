# Form Builder Demo Guide

This guide will help you quickly test the Form Builder application and see its key features in action.

## Quick Start Demo

### 1. Start the Application
```bash
npm start
```
The application will open at `http://localhost:3000`

### 2. Create Your First Form

#### Step 1: Add Basic Fields
1. Navigate to `/create` (default route)
2. Click "Add Field" button
3. Select "Text Input" and click "Add Field"
4. Configure the field:
   - Label: "Full Name"
   - Placeholder: "Enter your full name"
   - Toggle "Required" to ON
   - Add validation rule: Required with message "Name is required"

#### Step 2: Add More Field Types
1. Add a "Date" field:
   - Label: "Date of Birth"
   - Placeholder: "Select your birth date"
   - Toggle "Required" to ON

2. Add a "Number" field:
   - Label: "Phone Number"
   - Placeholder: "Enter your phone number"
   - Add validation: Min Length = 10, Max Length = 15

3. Add a "Select" field:
   - Label: "Country"
   - Add options:
     - Label: "United States", Value: "US"
     - Label: "Canada", Value: "CA"
     - Label: "United Kingdom", Value: "UK"
   - Toggle "Required" to ON

#### Step 3: Create a Derived Field
1. Add another "Number" field:
   - Label: "Age"
   - Toggle "Derived Field" to ON
   - Select "Date of Birth" as parent field
   - Formula: "Age calculation from Date of Birth"
   - This field will automatically calculate age based on the date of birth

#### Step 4: Add Validation Rules
1. For the "Full Name" field, add:
   - Min Length: 2 characters
   - Max Length: 50 characters
   - Custom message: "Name must be between 2 and 50 characters"

2. For the "Phone Number" field, add:
   - Required validation
   - Custom message: "Please enter a valid phone number"

### 3. Test the Form

#### Preview Mode
1. Click "Preview Form" button
2. Test all fields:
   - Try submitting without filling required fields
   - Test validation rules
   - Change the date of birth and watch the age field update automatically
   - Test the select dropdown

#### Form Behavior
- Required fields show validation errors when empty
- Date picker opens a calendar interface
- Age field automatically calculates based on date of birth
- All validation messages appear below fields

### 4. Save and Manage

#### Save the Form
1. Go back to the builder (`/create`)
2. Click "Save Form"
3. Enter form name: "User Registration Form"
4. Click "Save Form"

#### View Saved Forms
1. Navigate to `/myforms`
2. See your saved form with:
   - Form name and creation date
   - Field count summary
   - Quick access to preview or edit

### 5. Advanced Features Demo

#### Field Reordering
1. In the builder, drag and drop fields to reorder them
2. The order is maintained in preview mode

#### Edit Existing Form
1. From `/myforms`, click "Edit" on your saved form
2. Make changes (add/remove fields, modify validation)
3. Save again to update

#### Complex Validation
1. Add a "Text" field for email:
   - Label: "Email Address"
   - Add validation: Email format
   - Custom message: "Please enter a valid email address"

2. Add a "Text" field for password:
   - Label: "Password"
   - Add validation: Password rules
   - Custom message: "Password must be at least 8 characters with a number"

## Demo Scenarios

### Scenario 1: Contact Form
- Name (required, text)
- Email (required, email validation)
- Subject (required, text)
- Message (required, textarea, min 10 chars)
- Priority (select: Low, Medium, High)

### Scenario 2: Product Registration
- Product Name (required, text)
- Category (select: Electronics, Clothing, Books)
- Price (required, number, min 0)
- Description (textarea)
- In Stock (checkbox)
- Launch Date (date)

### Scenario 3: Survey Form
- Age Group (radio: 18-25, 26-35, 36-45, 45+)
- Occupation (text)
- Income Range (select: Low, Medium, High)
- Feedback (textarea, required)
- Would Recommend (radio: Yes, No, Maybe)

## Testing Tips

1. **Validation Testing**: Always test required fields and validation rules
2. **Derived Fields**: Test parent field changes trigger derived field updates
3. **Responsive Design**: Test on different screen sizes
4. **Browser Compatibility**: Test in Chrome, Firefox, Safari, Edge
5. **Local Storage**: Check that forms persist after browser refresh

## Troubleshooting Demo Issues

### Common Issues:
1. **Form not saving**: Check browser console for errors
2. **Validation not working**: Ensure validation rules are properly configured
3. **Derived fields not updating**: Verify parent field relationships
4. **Date picker not working**: Check if date-fns is properly installed

### Debug Steps:
1. Open browser developer tools (F12)
2. Check Console tab for errors
3. Check Application tab > Local Storage for saved forms
4. Check Redux DevTools if available

## Next Steps

After completing the demo:
1. Explore custom field types
2. Experiment with complex validation rules
3. Create multi-step forms
4. Test edge cases and error handling
5. Customize the UI theme

## Support

If you encounter issues during the demo:
1. Check the README.md for detailed documentation
2. Review the troubleshooting section
3. Check browser console for error messages
4. Verify all dependencies are installed correctly
