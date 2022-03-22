const express = require('express');
const app = express();
app.use(express.json());
const { nanoid } = require('nanoid');

const PORT = 2000;

const employee = [
  { id: 1, fullName: 'seto', gender: 'male', occupation: 'Digital Markerting' },
  { id: 2, fullName: 'mark', gender: 'male', occupation: 'programer' },
  { id: 3, fullName: 'surti', gender: 'female', occupation: 'data scienties' },
];

app.get('/employee', (req, res) => {
  console.log(employee);
  if (employee.length) {
    res.status(200).json({
      message: 'employee data fetch Successfully',
      result: employee,
    });
  } else {
    res.status(404).send('employee not found');
  }
});

app.get('/employee/:id', (req, res) => {
  const employeeId = req.params.id;

  const findIndex = employee.findIndex((val) => {
    return val.id == employeeId;
  });

  if (findIndex == -1) {
    res.status(400).json({
      message: `User with ID ${employeeId}, not found`,
    });
    return;
  }

  res.status(200).json({
    message: 'employee data found',
    return: employee[findIndex],
  });
});

app.post('/employee', (req, res) => {
  const data = req.body;

  if (!data) {
    return res.status(400).json({
      message: 'employee data is required',
    });
  }

  if (!data.fullName) {
    return res.status(400).json({
      message: 'employee fullName data is required',
    });
  }
  if (!data.occupation) {
    return res.status(400).json({
      message: 'employee occupation data is required',
    });
  }
  if (!data.gender) {
    return res.status(400).json({
      message: 'employee gender data is required',
    });
  }

  data.id = nanoid();
  employee.push(data);

  res.status(201).json({
    message: 'employee data Added succsessfuly',
    result: data,
  });
});

app.delete('/employee/:id', (req, res) => {
  const employeeId = req.params.id;

  const findIndex = employee.findIndex((val) => {
    return val.id == employeeId;
  });

  if (findIndex == -1) {
    res.status(400).json({
      message: `User with ID ${employeeId}, not found`,
    });
    return;
  }

  employee.splice(findIndex, 1);

  res.status(200).json({
    message: 'Employee data deleted',
  });
});

app.patch('/employee/:id', (req, res) => {
  const employeeId = req.params.id;
  const editEmployeeData = req.body;

  const findIndex = employee.findIndex((val) => {
    return val.id == employeeId;
  });

  if (findIndex == -1) {
    res.status(400).json({
      message: `User with ID ${employeeId}, not found`,
    });
    return;
  }

  employee[findIndex] = {
    ...employee[findIndex],
    ...editEmployeeData,
  };

  res.status(200).json({
    message: 'data edited',
    result: editEmployeeData,
  });
});

app.listen(PORT, () => {
  console.log('server runing in port', PORT);
});
