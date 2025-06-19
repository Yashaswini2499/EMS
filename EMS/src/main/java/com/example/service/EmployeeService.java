package com.example.service;

import java.util.List;

import com.example.dto.EmployeeDto;

public interface EmployeeService  {

 public EmployeeDto createNewEmployee(EmployeeDto emloyeeDto);

public List<EmployeeDto> getAllEmployees();

public EmployeeDto getEmployeeById(Long id);

public EmployeeDto updateEmployeeById(Long id,EmployeeDto employeeDto);

public void deleteEmployeeById(Long id);
 

}

