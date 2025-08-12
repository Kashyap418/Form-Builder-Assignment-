import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Box,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material';
import { Delete as DeleteIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { FormField, FieldType, ValidationRule, SelectOption } from '../types';

interface FieldConfigProps {
  field: FormField;
  onUpdate: (updates: Partial<FormField>) => void;
  onDelete: () => void;
  availableFields: FormField[];
}

const FieldConfig: React.FC<FieldConfigProps> = ({
  field,
  onUpdate,
  onDelete,
  availableFields,
}) => {
  const [newValidationRule, setNewValidationRule] = useState<Partial<ValidationRule>>({});
  const [newOption, setNewOption] = useState<Partial<SelectOption>>({});

  const handleValidationRuleAdd = () => {
    if (newValidationRule.type && newValidationRule.message) {
      const rule: ValidationRule = {
        type: newValidationRule.type as ValidationRule['type'],
        value: newValidationRule.value,
        message: newValidationRule.message,
      };
      onUpdate({
        validationRules: [...field.validationRules, rule],
      });
      setNewValidationRule({});
    }
  };

  const handleValidationRuleDelete = (index: number) => {
    const updatedRules = field.validationRules.filter((_, i) => i !== index);
    onUpdate({ validationRules: updatedRules });
  };

  const handleOptionAdd = () => {
    if (newOption.label && newOption.value) {
      const option: SelectOption = {
        label: newOption.label,
        value: newOption.value,
      };
      onUpdate({
        options: [...(field.options || []), option],
      });
      setNewOption({});
    }
  };

  const handleOptionDelete = (index: number) => {
    const updatedOptions = field.options?.filter((_, i) => i !== index) || [];
    onUpdate({ options: updatedOptions });
  };

  const renderValidationRuleInputs = () => {
    switch (newValidationRule.type) {
      case 'minLength':
      case 'maxLength':
        return (
          <TextField
            type="number"
            label="Value"
            value={newValidationRule.value || ''}
            onChange={(e) => setNewValidationRule({ ...newValidationRule, value: e.target.value })}
            size="small"
            sx={{ width: 120 }}
          />
        );
      case 'custom':
        return (
          <TextField
            label="Custom Rule"
            value={newValidationRule.value || ''}
            onChange={(e) => setNewValidationRule({ ...newValidationRule, value: e.target.value })}
            size="small"
            sx={{ width: 200 }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="div">
            {field.label || `Field ${field.id}`}
          </Typography>
          <IconButton onClick={onDelete} color="error" size="small">
            <DeleteIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Label"
            value={field.label}
            onChange={(e) => onUpdate({ label: e.target.value })}
            size="small"
            sx={{ minWidth: 200 }}
          />
          
          <TextField
            label="Placeholder"
            value={field.placeholder || ''}
            onChange={(e) => onUpdate({ placeholder: e.target.value })}
            size="small"
            sx={{ minWidth: 200 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={field.required}
                onChange={(e) => onUpdate({ required: e.target.checked })}
              />
            }
            label="Required"
          />

          <FormControlLabel
            control={
              <Switch
                checked={field.isDerived}
                onChange={(e) => onUpdate({ isDerived: e.target.checked })}
              />
            }
            label="Derived Field"
          />
        </Box>

        {field.isDerived && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Derived Field Configuration</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Parent Fields</InputLabel>
                  <Select
                    multiple
                    value={field.parentFields || []}
                    onChange={(e) => onUpdate({ parentFields: e.target.value as string[] })}
                    label="Parent Fields"
                  >
                    {availableFields
                      .filter(f => f.id !== field.id)
                      .map(f => (
                        <MenuItem key={f.id} value={f.id}>
                          {f.label}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                
                <TextField
                  label="Derived Formula"
                  value={field.derivedFormula || ''}
                  onChange={(e) => onUpdate({ derivedFormula: e.target.value })}
                  placeholder="e.g., Age calculation from Date of Birth"
                  multiline
                  rows={2}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        )}

        {(field.type === 'select' || field.type === 'radio') && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Options</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {field.options?.map((option, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      label="Label"
                      value={option.label}
                      size="small"
                      sx={{ flexGrow: 1 }}
                      onChange={(e) => {
                        const updatedOptions = [...(field.options || [])];
                        updatedOptions[index] = { ...option, label: e.target.value };
                        onUpdate({ options: updatedOptions });
                      }}
                    />
                    <TextField
                      label="Value"
                      value={option.value}
                      size="small"
                      sx={{ flexGrow: 1 }}
                      onChange={(e) => {
                        const updatedOptions = [...(field.options || [])];
                        updatedOptions[index] = { ...option, value: e.target.value };
                        onUpdate({ options: updatedOptions });
                      }}
                    />
                    <IconButton onClick={() => handleOptionDelete(index)} color="error" size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    label="New Option Label"
                    value={newOption.label || ''}
                    onChange={(e) => setNewOption({ ...newOption, label: e.target.value })}
                    size="small"
                    sx={{ flexGrow: 1 }}
                  />
                  <TextField
                    label="New Option Value"
                    value={newOption.value || ''}
                    onChange={(e) => setNewOption({ ...newOption, value: e.target.value })}
                    size="small"
                    sx={{ flexGrow: 1 }}
                  />
                  <Button onClick={handleOptionAdd} variant="outlined" size="small">
                    Add Option
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        )}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Validation Rules
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {field.validationRules.map((rule, index) => (
            <Chip
              key={index}
              label={`${rule.type}: ${rule.value || rule.message}`}
              onDelete={() => handleValidationRuleDelete(index)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Rule Type</InputLabel>
            <Select
              value={newValidationRule.type || ''}
              onChange={(e) => setNewValidationRule({ ...newValidationRule, type: e.target.value as ValidationRule['type'] })}
              label="Rule Type"
            >
              <MenuItem value="required">Required</MenuItem>
              <MenuItem value="minLength">Min Length</MenuItem>
              <MenuItem value="maxLength">Max Length</MenuItem>
              <MenuItem value="email">Email Format</MenuItem>
              <MenuItem value="password">Password Rules</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
          </FormControl>

          {renderValidationRuleInputs()}

          <TextField
            label="Error Message"
            value={newValidationRule.message || ''}
            onChange={(e) => setNewValidationRule({ ...newValidationRule, message: e.target.value })}
            size="small"
            sx={{ minWidth: 200 }}
          />

          <Button onClick={handleValidationRuleAdd} variant="outlined" size="small">
            Add Rule
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FieldConfig;
