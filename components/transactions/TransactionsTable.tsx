import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import CurrencyInput from "react-currency-input-field";

interface Transaction {
  id: string;
  title: string;
  description: string;
  date: Date;
  total_amount: number;
}

interface TableComponentProps {
  data: Transaction[];
  onEdit: (id: string, updates: Partial<Transaction>) => void;
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const [editableRow, setEditableRow] = React.useState<string | null>(null);
  const [editValues, setEditValues] = React.useState<Partial<Transaction>>({});

  const handleEditClick = (id: string) => {
    setEditableRow(id);
    const row = data.find((row) => row.id === id);
    if (row) setEditValues(row);
  };

  const handleSaveClick = () => {
    if (editableRow) {
      onEdit(editableRow, editValues);
      setEditableRow(null);
      setEditValues({});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditValues({ ...editValues, [name]: value });
  };

  const handleCurrencyChange = (value: any) => {
    setEditValues({ ...editValues, total_amount: value.float });
  };

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      renderCell: (params) =>
        editableRow === params.row.id ? (
          <TextField
            name="title"
            value={editValues.title}
            onChange={handleInputChange}
            className="bg-[hsl(var(--btn-background))] text-[hsl(var(--foreground))]"
          />
        ) : (
          params.value
        ),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 250,
      renderCell: (params) =>
        editableRow === params.row.id ? (
          <TextField
            name="description"
            value={editValues.description}
            onChange={handleInputChange}
            className="bg-[hsl(var(--btn-background))] text-[hsl(var(--foreground))]"
          />
        ) : (
          params.value
        ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      valueGetter: (value) => new Date(value),
      type: "date",
    },
    {
      field: 'total_amount',
      headerName: 'Total Amount',
      width: 150,
      type: 'number',
      renderCell: (params) =>
        editableRow === params.row.id ? (
          <CurrencyInput
            name="total_amount"
            prefix="€"
            className="bg-[hsl(var(--btn-background))] text-[hsl(var(--foreground))]"
            value={editValues.total_amount}
            onValueChange={(_value, _name, values) => handleCurrencyChange(values)}
            decimalsLimit={2}
          />
        ) : (
          params.value
        ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          {editableRow === params.row.id ? (
            <Button
              variant="contained"
              size="small"
              onClick={handleSaveClick}
              className="mr-2 bg-[hsl(var(--btn-background))] text-[hsl(var(--foreground))]"
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              onClick={() => handleEditClick(params.row.id)}
              className="mr-2 bg-[hsl(var(--btn-background))] text-[hsl(var(--foreground))]"
            >
              Edit
            </Button>
          )}
          <Button
            variant="contained"
            size="small"
            onClick={() => onDelete(params.row.id)}
            className="bg-[hsl(var(--btn-background))] text-[hsl(var(--foreground))]"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
      {
        field: "title",
        operator: "contains",
        value: "",
      },
    ],
  });

  return (
    <div className="h-96 w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <DataGrid
        rows={data}
        columns={columns}
        slots={{
          toolbar: GridToolbar,
        }}
        sx={{
          color: 'hsl(var(--foreground))',
          background: 'hsl(var(--background))'
        }}
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
      />
    </div>
  );
};

export default TableComponent;
