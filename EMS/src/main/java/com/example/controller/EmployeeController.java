package com.example.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.service.EmployeeService;
import com.example.dto.EmployeeDto;


import org.springframework.web.bind.annotation.RequestBody;
import lombok.AllArgsConstructor;
import com.example.service.EmployeeService; 

@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<EmployeeDto> createNewEmployee(@RequestBody EmployeeDto employeeDto) {
        EmployeeDto savedEmployee = employeeService.createNewEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }
    
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployees()
    {
    	List<EmployeeDto> allEmployees=employeeService.getAllEmployees();
    	return new ResponseEntity<>(allEmployees,HttpStatus.OK);
    }
    
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId)
    {
    	EmployeeDto employeeById=employeeService.getEmployeeById(employeeId);
    	return new ResponseEntity<>(employeeById,HttpStatus.OK);	
    }
    
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployeeById(@PathVariable("id") Long employeeId,@RequestBody EmployeeDto employeeDto)
    
    { 
    	EmployeeDto employeeById=employeeService.updateEmployeeById(employeeId,employeeDto);
    	return new ResponseEntity<>(employeeById,HttpStatus.OK);
    	
    }
    
    
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployeeById(@PathVariable("id") Long id)
    {
    	employeeService.deleteEmployeeById(id);
     return new ResponseEntity<>("employee record deleted successfully",HttpStatus.OK);
    }
    
}
