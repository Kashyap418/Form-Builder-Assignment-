import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Paper,
} from '@mui/material';
import { Add as AddIcon, Save as SaveIcon, Preview as PreviewIcon } from '@mui/icons-material';
import { RootState } from '../store/store';
import { initializeForm, addField, updateField, deleteField, reorderFields, saveForm } from '../store/formSlice';
import { FieldType } from '../types';
import FieldConfig from '../components/FieldConfig';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CreateForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentForm } = useSelector((state: RootState) => state.form);
  const [showAddFieldDialog, setShowAddFieldDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [formName, setFormName] = useState('');
  const [selectedFieldType, setSelectedFieldType] = useState<FieldType>('text');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentForm) {
      dispatch(initializeForm());
    }
  }, [dispatch, currentForm]);

  const handleAddField = () => {
    if (selectedFieldType) {
      dispatch(addField({ type: selectedFieldType }));
      setShowAddFieldDialog(false);
      setSelectedFieldType('text');
    }
  };

  const handleUpdateField = (fieldId: string, updates: any) => {
    dispatch(updateField({ id: fieldId, updates }));
  };

  const handleDeleteField = (fieldId: string) => {
    dispatch(deleteField(fieldId));
  };

  const handleSaveForm = () => {
    if (!formName.trim()) {
      setError('Please enter a form name');
      return;
    }
    if (!currentForm?.fields.length) {
      setError('Please add at least one field to the form');
      return;
    }
    
    dispatch(saveForm(formName));
    setShowSaveDialog(false);
    setFormName('');
    setError('');
    navigate('/myforms');
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    dispatch(reorderFields({
      fromIndex: result.source.index,
      toIndex: result.destination.index,
    }));
  };

  const fieldTypes: { value: FieldType; label: string }[] = [
    { value: 'text', label: 'Text Input' },
    { value: 'number', label: 'Number Input' },
    { value: 'textarea', label: 'Text Area' },
    { value: 'select', label: 'Dropdown Select' },
    { value: 'radio', label: 'Radio Buttons' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'date', label: 'Date Picker' },
  ];

  if (!currentForm) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Create New Form
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PreviewIcon />}
            onClick={() => navigate('/preview')}
            disabled={!currentForm.fields.length}
          >
            Preview Form
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={() => setShowSaveDialog(true)}
            disabled={!currentForm.fields.length}
          >
            Save Form
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Form Fields</Typography>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setShowAddFieldDialog(true)}
              >
                Add Field
              </Button>
            </Box>

            {currentForm.fields.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="textSecondary">
                  Click "Add Field" to get started.
                </Typography>
              </Box>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="fields">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {currentForm.fields.map((field, index) => (
                        <Draggable key={field.id} draggableId={field.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <FieldConfig
                                field={field}
                                onUpdate={(updates) => handleUpdateField(field.id, updates)}
                                onDelete={() => handleDeleteField(field.id)}
                                availableFields={currentForm.fields}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Form Summary
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

      {/* Add Field Dialog */}
      <Dialog open={showAddFieldDialog} onClose={() => setShowAddFieldDialog(false)}>
        <DialogTitle>Add New Field</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Field Type</InputLabel>
            <Select
              value={selectedFieldType}
              onChange={(e) => setSelectedFieldType(e.target.value as FieldType)}
              label="Field Type"
            >
              {fieldTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddFieldDialog(false)}>Cancel</Button>
          <Button onClick={handleAddField} variant="contained">
            Add Field
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save Form Dialog */}
      <Dialog open={showSaveDialog} onClose={() => setShowSaveDialog(false)}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Form Name"
            fullWidth
            variant="outlined"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSaveDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveForm} variant="contained">
            Save Form
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateForm;
