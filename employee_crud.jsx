import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { useAuth } from "@/hooks/useAuth";

export default function EmployeeCRUD() {
  const { isAuthenticated } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const addEmployee = () => {
    if (!name.trim() || !role.trim()) {
      alert("Name and role are required.");
      return;
    }
    if (editingIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editingIndex] = { name, role };
      setEmployees(updatedEmployees);
      setEditingIndex(null);
    } else {
      setEmployees([...employees, { name, role }]);
    }
    setName("");
    setRole("");
  };

  const editEmployee = (index) => {
    setName(employees[index].name);
    setRole(employees[index].role);
    setEditingIndex(index);
  };

  const deleteEmployee = (index) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((_, i) => i !== index));
    }
  };

  if (!isAuthenticated) {
    return <p className="text-red-500">Access denied. Please log in.</p>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-bold">Employee Management</h2>
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
          <Button onClick={addEmployee}>{editingIndex !== null ? "Update" : "Add"} Employee</Button>
        </CardContent>
      </Card>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow key={index}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell>
                <Button className="mr-2" onClick={() => editEmployee(index)}>Edit</Button>
                <Button variant="destructive" onClick={() => deleteEmployee(index)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
