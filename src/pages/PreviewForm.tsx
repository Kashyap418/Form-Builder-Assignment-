import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Alert,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RootState } from '../store/store';
import { FormField, FormValues, ValidationRule } from '../types';

const PreviewForm: React.FC = () => {
  const navigate = useNavigate();
  const { currentForm } = useSelector((state: RootState) => state.form);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!currentForm) {
      navigate('/create');
      return;
    }

    // Initialize form values with defaults
    const initialValues: FormValues = {};
    currentForm.fields.forEach(field => {
      if (field.defaultValue !== undefined) {
        initialValues[field.id] = field.defaultValue;
      } else {
        switch (field.type) {
          case 'checkbox':
            initialValues[field.id] = false;
            break;
          case 'select':
          case 'radio':
            initialValues[field.id] = field.options?.[0]?.value || '';
            break;
          default:
            initialValues[field.id] = '';
        }
      }
    });
    setFormValues(initialValues);
  }, [currentForm, navigate]);

  const validateField = (field: FormField, value: any): string => {
    const fieldErrors: string[] = [];

    field.validationRules.forEach(rule => {
      switch (rule.type) {
        case 'required':
          if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
            fieldErrors.push(rule.message || 'This field is required');
          }
          break;
        case 'minLength':
          if (value && typeof value === 'string' && value.length < (rule.value as number)) {
            fieldErrors.push(rule.message || `Minimum length is ${rule.value} characters`);
          }
          break;
        case 'maxLength':
          if (value && typeof value === 'string' && value.length > (rule.value as number)) {
            fieldErrors.push(rule.message || `Maximum length is ${rule.value} characters`);
          }
          break;
        case 'email':
          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            fieldErrors.push(rule.message || 'Please enter a valid email address');
          }
          break;
        case 'password':
          if (value) {
            if (value.length < 8) {
              fieldErrors.push(rule.message || 'Password must be at least 8 characters long');
            } else if (!/\d/.test(value)) {
              fieldErrors.push(rule.message || 'Password must contain at least one number');
            }
          }
          break;
        case 'custom':
          // Custom validation logic can be implemented here
          if (rule.value && value !== rule.value) {
            fieldErrors.push(rule.message || 'Custom validation failed');
          }
          break;
      }
    });

    return fieldErrors[0] || '';
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [fieldId]: true }));
    
    // Validate field
    const field = currentForm?.fields.find(f => f.id === fieldId);
    if (field) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [fieldId]: error }));
    }
  };

  const calculateDerivedValue = (field: FormField): any => {
    if (!field.isDerived || !field.parentFields || !field.derivedFormula) {
      return formValues[field.id];
    }

    // Simple derived field calculation - this can be enhanced
    const parentValues = field.parentFields.map(parentId => formValues[parentId]);
    
    // Example: Age calculation from Date of Birth
    if (field.derivedFormula.toLowerCase().includes('age') && field.derivedFormula.toLowerCase().includes('date')) {
      const dobValue = parentValues[0];
      if (dobValue && dobValue instanceof Date) {
        const today = new Date();
        const birthDate = new Date(dobValue);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      }
    }

    // Default: return the formula as a string (can be enhanced with a proper expression evaluator)
    return field.derivedFormula;
  };

  const renderField = (field: FormField) => {
    const value = formValues[field.id];
    const error = errors[field.id];
    const isTouched = touched[field.id];
    const showError = isTouched && error;

    const commonProps = {
      fullWidth: true,
      error: !!showError,
      helperText: showError,
      value: field.isDerived ? calculateDerivedValue(field) : value,
      onChange: field.isDerived ? undefined : (e: any) => handleFieldChange(field.id, e.target.value),
      onBlur: () => setTouched(prev => ({ ...prev, [field.id]: true })),
      placeholder: field.placeholder,
      disabled: field.isDerived,
    };

    switch (field.type) {
      case 'text':
        return <TextField {...commonProps} label={field.label} />;
      
      case 'number':
        return (
          <TextField
            {...commonProps}
            label={field.label}
            type="number"
            onChange={(e) => handleFieldChange(field.id, parseFloat(e.target.value) || '')}
          />
        );
      
      case 'textarea':
        return (
          <TextField
            {...commonProps}
            label={field.label}
            multiline
            rows={4}
          />
        );
      
      case 'select':
        return (
          <FormControl fullWidth error={!!showError}>
            <InputLabel>{field.label}</InputLabel>
            <Select
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, [field.id]: true }))}
              label={field.label}
              disabled={field.isDerived}
            >
              {field.options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {showError && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        );
      
             case 'radio':
         return (
           <FormControl component="fieldset" error={!!showError}>
             <FormLabel component="legend">{field.label}</FormLabel>
             <RadioGroup
               value={value}
               onChange={(e) => handleFieldChange(field.id, e.target.value)}
             >
               {field.options?.map((option) => (
                 <FormControlLabel
                   key={option.value}
                   value={option.value}
                   control={<Radio disabled={field.isDerived} />}
                   label={option.label}
                 />
               ))}
             </RadioGroup>
             {showError && <FormHelperText>{error}</FormHelperText>}
           </FormControl>
         );
      
      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!value}
                onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                disabled={field.isDerived}
              />
            }
            label={field.label}
          />
        );
      
      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={field.label}
              value={value ? new Date(value) : null}
              onChange={(newValue) => handleFieldChange(field.id, newValue)}
              disabled={field.isDerived}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!showError,
                  helperText: showError,
                  onBlur: () => setTouched(prev => ({ ...prev, [field.id]: true })),
                },
              }}
            />
          </LocalizationProvider>
        );
      
      default:
        return <TextField {...commonProps} label={field.label} />;
    }
  };

  if (!currentForm) {
    return <Typography>No form to preview</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Preview Form: {currentForm.name || 'Untitled Form'}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/create')}
        >
          Back to Builder
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Form Preview
            </Typography>

            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {currentForm.fields.map((field) => (
                <Box key={field.id}>
                  {renderField(field)}
                  {field.isDerived && (
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                      This is a derived field based on: {field.parentFields?.join(', ')}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Form Information
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Fields: {currentForm.fields.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Required Fields: {currentForm.fields.filter(f => f.required).length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Derived Fields: {currentForm.fields.filter(f => f.isDerived).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PreviewForm;
