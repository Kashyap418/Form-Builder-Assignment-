# Application Test Checklist

Use this checklist to verify that all features of the Form Builder application are working correctly.

## ✅ Basic Application Setup
- [ ] Application starts without errors
- [ ] Navigation between routes works
- [ ] Material-UI components render correctly
- [ ] Redux store initializes properly
- [ ] localStorage persistence works

## ✅ Form Builder (/create)
- [ ] Page loads and shows "Create New Form" title
- [ ] "Add Field" button opens dialog
- [ ] All 7 field types can be selected:
  - [ ] Text Input
  - [ ] Number Input
  - [ ] Text Area
  - [ ] Dropdown Select
  - [ ] Radio Buttons
  - [ ] Checkbox
  - [ ] Date Picker
- [ ] Fields are added to the form when selected
- [ ] Field configuration panels expand/collapse
- [ ] Field labels can be edited
- [ ] Placeholders can be set
- [ ] Required toggle works
- [ ] Derived field toggle works

## ✅ Field Configuration
- [ ] Field labels update in real-time
- [ ] Placeholder text is saved
- [ ] Required toggle changes field behavior
- [ ] Derived field configuration shows when enabled
- [ ] Parent field selection works for derived fields
- [ ] Derived formula can be entered
- [ ] Options can be added for select/radio fields
- [ ] Options can be edited and deleted

## ✅ Validation Rules
- [ ] Required validation can be added
- [ ] Min/Max length validation works
- [ ] Email format validation works
- [ ] Password rules validation works
- [ ] Custom validation can be added
- [ ] Validation error messages can be customized
- [ ] Validation rules are displayed as chips
- [ ] Validation rules can be deleted

## ✅ Field Management
- [ ] Fields can be deleted
- [ ] Drag and drop reordering works
- [ ] Field order is maintained
- [ ] Form summary shows correct counts
- [ ] Preview button is enabled when fields exist
- [ ] Save button is enabled when fields exist

## ✅ Form Preview (/preview)
- [ ] Page loads with current form
- [ ] All fields render correctly
- [ ] Text inputs accept user input
- [ ] Number inputs accept numeric input
- [ ] Textarea expands to multiple lines
- [ ] Select dropdown shows options
- [ ] Radio buttons allow single selection
- [ ] Checkbox toggles on/off
- [ ] Date picker opens calendar
- [ ] Validation errors show when fields are touched
- [ ] Required field validation works
- [ ] Length validation works
- [ ] Email validation works
- [ ] Password validation works
- [ ] Derived fields show calculated values
- [ ] Derived fields update when parent fields change

## ✅ Form Management
- [ ] Forms can be saved with names
- [ ] Saved forms appear in My Forms
- [ ] Forms can be loaded for editing
- [ ] Forms can be loaded for preview
- [ ] Form statistics are displayed correctly
- [ ] Form creation dates are shown
- [ ] Form update dates are shown

## ✅ Navigation and Routing
- [ ] Navigation bar shows all three routes
- [ ] Active route is highlighted
- [ ] Routes change when navigation buttons are clicked
- [ ] Browser back/forward buttons work
- [ ] Direct URL access works for all routes

## ✅ Responsive Design
- [ ] Application works on desktop
- [ ] Application works on tablet
- [ ] Application works on mobile
- [ ] Grid layout adapts to screen size
- [ ] Buttons and inputs are properly sized

## ✅ Data Persistence
- [ ] Forms are saved to localStorage
- [ ] Forms persist after browser refresh
- [ ] Forms persist after browser restart
- [ ] Multiple forms can be saved
- [ ] Form data is not lost during navigation

## ✅ Error Handling
- [ ] Validation errors display correctly
- [ ] Required field errors show when appropriate
- [ ] Form submission validation works
- [ ] Error messages are user-friendly
- [ ] Application doesn't crash on invalid input

## ✅ Performance
- [ ] Application loads quickly
- [ ] Field addition is responsive
- [ ] Form preview renders smoothly
- [ ] Drag and drop is smooth
- [ ] No memory leaks during use

## 🔧 Troubleshooting Common Issues

### If validation isn't working:
1. Check that validation rules are properly added
2. Ensure error messages are set
3. Verify field is marked as required if needed

### If derived fields aren't updating:
1. Check parent field selection
2. Verify derived formula is entered
3. Ensure parent fields have values

### If forms aren't saving:
1. Check browser console for errors
2. Verify localStorage is enabled
3. Check that form has at least one field

### If drag and drop isn't working:
1. Ensure react-beautiful-dnd is installed
2. Check browser compatibility
3. Verify field IDs are unique

## 📱 Browser Testing
Test the application in:
- [ ] Chrome (recommended)
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## 🎯 Test Scenarios

### Scenario 1: Simple Contact Form
1. Create a form with Name, Email, and Message fields
2. Add validation rules
3. Preview and test
4. Save the form
5. Verify it appears in My Forms

### Scenario 2: Complex Form with Derived Fields
1. Create a form with Date of Birth and Age fields
2. Make Age a derived field based on Date of Birth
3. Test the automatic calculation
4. Save and reload the form

### Scenario 3: Form with All Field Types
1. Create a form using all 7 field types
2. Add various validation rules
3. Test all field interactions
4. Save and verify all data is preserved

## 🚀 Performance Benchmarks
- [ ] Application loads in under 3 seconds
- [ ] Field addition responds in under 500ms
- [ ] Form preview renders in under 1 second
- [ ] Form save completes in under 500ms
- [ ] Navigation between routes is instant

## 📊 Success Criteria
The application is working correctly if:
- All checkboxes above are checked
- All test scenarios pass
- Performance benchmarks are met
- No console errors appear
- All features function as described in the README

## 🆘 Getting Help
If you encounter issues:
1. Check the browser console for errors
2. Review the README.md documentation
3. Check the DEMO.md for step-by-step guidance
4. Verify all dependencies are installed correctly
5. Test in a different browser to isolate issues
