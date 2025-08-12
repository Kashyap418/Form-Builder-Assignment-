import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Form, FormField, FieldType, ValidationRule } from '../types';

const initialState = {
  currentForm: null as Form | null,
  savedForms: [] as Form[],
  isPreviewMode: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    initializeForm: (state) => {
      if (!state.currentForm) {
        state.currentForm = {
          id: Date.now().toString(),
          name: '',
          fields: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
    },
    addField: (state, action: PayloadAction<{ type: FieldType; afterId?: string }>) => {
      if (!state.currentForm) return;
      
      const newField: FormField = {
        id: Date.now().toString(),
        type: action.payload.type,
        label: `New ${action.payload.type} field`,
        required: false,
        validationRules: [],
        isDerived: false,
        order: state.currentForm.fields.length,
        placeholder: '',
      };

      if (action.payload.afterId) {
        const afterIndex = state.currentForm.fields.findIndex(f => f.id === action.payload.afterId);
        if (afterIndex !== -1) {
          state.currentForm.fields.splice(afterIndex + 1, 0, newField);
          // Reorder fields
          state.currentForm.fields.forEach((field, index) => {
            field.order = index;
          });
        } else {
          state.currentForm.fields.push(newField);
        }
      } else {
        state.currentForm.fields.push(newField);
      }
      
      state.currentForm.updatedAt = new Date().toISOString();
    },
    updateField: (state, action: PayloadAction<{ id: string; updates: Partial<FormField> }>) => {
      if (!state.currentForm) return;
      
      const fieldIndex = state.currentForm.fields.findIndex(f => f.id === action.payload.id);
      if (fieldIndex !== -1) {
        state.currentForm.fields[fieldIndex] = {
          ...state.currentForm.fields[fieldIndex],
          ...action.payload.updates,
        };
        state.currentForm.updatedAt = new Date().toISOString();
      }
    },
    deleteField: (state, action: PayloadAction<string>) => {
      if (!state.currentForm) return;
      
      state.currentForm.fields = state.currentForm.fields.filter(f => f.id !== action.payload);
      // Reorder remaining fields
      state.currentForm.fields.forEach((field, index) => {
        field.order = index;
      });
      state.currentForm.updatedAt = new Date().toISOString();
    },
    reorderFields: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      if (!state.currentForm) return;
      
      const { fromIndex, toIndex } = action.payload;
      const fields = [...state.currentForm.fields];
      const [movedField] = fields.splice(fromIndex, 1);
      fields.splice(toIndex, 0, movedField);
      
      // Update order
      fields.forEach((field, index) => {
        field.order = index;
      });
      
      state.currentForm.fields = fields;
      state.currentForm.updatedAt = new Date().toISOString();
    },
    saveForm: (state, action: PayloadAction<string>) => {
      if (!state.currentForm) return;
      
      const formToSave = {
        ...state.currentForm,
        name: action.payload,
        updatedAt: new Date().toISOString(),
      };
      
      const existingIndex = state.savedForms.findIndex(f => f.id === formToSave.id);
      if (existingIndex !== -1) {
        state.savedForms[existingIndex] = formToSave;
      } else {
        state.savedForms.push(formToSave);
      }
      
      // Clear current form
      state.currentForm = null;
    },
    loadForm: (state, action: PayloadAction<string>) => {
      const form = state.savedForms.find(f => f.id === action.payload);
      if (form) {
        state.currentForm = { ...form };
      }
    },
    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.isPreviewMode = action.payload;
    },
    clearCurrentForm: (state) => {
      state.currentForm = null;
    },
    loadSavedForms: (state) => {
      const saved = localStorage.getItem('savedForms');
      if (saved) {
        try {
          state.savedForms = JSON.parse(saved);
        } catch (error) {
          console.error('Error loading saved forms:', error);
        }
      }
    },
  },
});

export const {
  initializeForm,
  addField,
  updateField,
  deleteField,
  reorderFields,
  saveForm,
  loadForm,
  setPreviewMode,
  clearCurrentForm,
  loadSavedForms,
} = formSlice.actions;

export default formSlice.reducer;
