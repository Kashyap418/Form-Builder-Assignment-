# React + Redux Form Builder

A dynamic form builder application built with React, TypeScript, Material-UI, and Redux. Users can create, configure, preview, and manage dynamic forms with various field types, validation rules, and derived fields.

## Features

### 🏗️ Form Builder (/create)
- **Dynamic Field Addition**: Add fields of 7 different types:
  - Text Input
  - Number Input
  - Text Area
  - Dropdown Select
  - Radio Buttons
  - Checkbox
  - Date Picker

- **Field Configuration**:
  - Custom labels and placeholders
  - Required field toggles
  - Default values
  - Comprehensive validation rules
  - Derived field support

- **Validation Rules**:
  - Required field validation
  - Minimum/maximum length
  - Email format validation
  - Password rules (8+ chars, must contain number)
  - Custom validation rules

- **Derived Fields**:
  - Fields that compute values based on parent fields
  - Example: Age calculation from Date of Birth
  - Automatic updates when parent fields change

- **Field Management**:
  - Drag and drop reordering
  - Delete fields
  - Real-time preview

### 👀 Form Preview (/preview)
- **End-User Experience**: See exactly how your form will appear
- **Live Validation**: All validation rules are active
- **Derived Field Updates**: Automatic calculation and updates
- **Responsive Design**: Works on all device sizes

### 📋 My Forms (/myforms)
- **Form Library**: View all saved forms
- **Quick Access**: Preview or edit existing forms
- **Form Statistics**: Field counts, creation dates, and summaries
- **Persistent Storage**: All forms saved to localStorage

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **UI Framework**: Material-UI (MUI) v5
- **Routing**: React Router v6
- **Drag & Drop**: react-beautiful-dnd
- **Date Handling**: date-fns
- **Storage**: localStorage for persistence

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-redux-form-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Usage Guide

### Creating a New Form

1. Navigate to `/create`
2. Click "Add Field" to add form fields
3. Configure each field:
   - Set label and placeholder
   - Toggle required status
   - Add validation rules
   - Configure options for select/radio fields
   - Set up derived fields if needed
4. Drag and drop to reorder fields
5. Click "Preview Form" to test
6. Click "Save Form" when ready

### Field Types and Configuration

#### Text Fields (text, textarea, number)
- Basic input with validation
- Support for min/max length
- Placeholder text

#### Select Fields (select, radio)
- Add custom options with labels and values
- Dynamic option management
- Radio buttons for single selection

#### Date Fields
- Date picker with validation
- Perfect for derived field calculations

#### Checkbox Fields
- Boolean values
- Simple true/false toggles

### Validation Rules

- **Required**: Field must have a value
- **Min/Max Length**: String length constraints
- **Email**: Email format validation
- **Password**: Custom password requirements
- **Custom**: User-defined validation logic

### Derived Fields

Derived fields automatically calculate values based on other fields:

1. **Enable Derived Field**: Toggle the "Derived Field" switch
2. **Select Parent Fields**: Choose which fields to base calculations on
3. **Define Formula**: Describe the calculation logic
4. **Automatic Updates**: Values update when parent fields change

Example: Age field derived from Date of Birth
- Parent Field: Date of Birth
- Formula: "Age calculation from Date of Birth"
- Result: Automatic age calculation

### Preview and Testing

- Navigate to `/preview` to test your form
- All validation rules are active
- Derived fields update automatically
- Test user interactions and error handling

### Managing Forms

- View all saved forms at `/myforms`
- Preview forms without editing
- Edit existing forms
- See form statistics and field summaries

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FieldConfig.tsx # Field configuration component
│   └── Navigation.tsx  # Navigation component
├── pages/              # Main application pages
│   ├── CreateForm.tsx  # Form builder page
│   ├── PreviewForm.tsx # Form preview page
│   └── MyForms.tsx     # Saved forms list
├── store/              # Redux store and slices
│   ├── formSlice.ts    # Form state management
│   └── store.ts        # Store configuration
├── types/              # TypeScript type definitions
│   └── index.ts        # Main type definitions
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## State Management

The application uses Redux Toolkit for predictable state management:

- **Form Slice**: Manages current form, saved forms, and preview mode
- **Actions**: Add/update/delete fields, save forms, load forms
- **Local Storage**: Automatic persistence of saved forms
- **Real-time Updates**: Immediate UI updates on state changes

## Customization

### Adding New Field Types

1. Extend the `FieldType` union in `types/index.ts`
2. Add field type to the field types array in `CreateForm.tsx`
3. Implement rendering logic in `PreviewForm.tsx`
4. Add validation support if needed

### Custom Validation Rules

1. Extend the `ValidationRule` interface
2. Add validation logic in `PreviewForm.tsx`
3. Update the validation UI in `FieldConfig.tsx`

### Styling

The application uses Material-UI with a customizable theme:
- Modify `src/index.tsx` for theme changes
- Use MUI's `sx` prop for component-specific styling
- Leverage MUI's design system for consistency

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Considerations

- Forms are stored in localStorage (no backend required)
- Efficient re-rendering with React hooks
- Optimized field validation
- Lazy loading of form components

## Troubleshooting

### Common Issues

1. **Form not saving**: Check localStorage permissions
2. **Validation not working**: Ensure validation rules are properly configured
3. **Derived fields not updating**: Verify parent field relationships
4. **Drag and drop issues**: Check browser compatibility

### Development Tips

- Use browser dev tools to inspect Redux state
- Check localStorage for saved form data
- Validate TypeScript types for field configurations
- Test on different screen sizes for responsiveness

## Future Enhancements

- **Advanced Validation**: Custom validation functions
- **Conditional Fields**: Show/hide fields based on conditions
- **Form Templates**: Pre-built form layouts
- **Export/Import**: JSON form definitions
- **Multi-step Forms**: Wizard-style form flows
- **Real-time Collaboration**: Multiple users editing forms

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please check the troubleshooting section or create an issue in the repository.
