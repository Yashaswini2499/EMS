package com.example.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service; 


import com.example.dto.EmployeeDto;
import com.example.entity.Employee;
import com.example.mapper.employeeMapper;
import com.example.repository.EmployeeRepository;

import exception.EmployeeResourceNotFoundException;
@Service  // use Spring's annotation, not jvnet.hk2
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    // Constructor injection (recommended)
    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeDto createNewEmployee(EmployeeDto employeeDto) {
        Employee newEmployee = employeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(newEmployee);
        return employeeMapper.mapToEmployeeDto(savedEmployee);
    }
    @Override
    public List<EmployeeDto> getAllEmployees()
    {
    	List<Employee> allEmployees=employeeRepository.findAll();
    	return allEmployees.stream().map((e)->employeeMapper.mapToEmployeeDto(e)).collect(Collectors.toList());
    }
    @Override
    public EmployeeDto getEmployeeById(Long id)
    {
    	Employee employee = employeeRepository.findById(id).orElseThrow(()->new EmployeeResourceNotFoundException("employee id doesn't found"));
    	return employeeMapper.mapToEmployeeDto(employee);
    	
    }
    
    @Override
    public EmployeeDto updateEmployeeById (Long id,EmployeeDto employeeDto)
    {
    	Employee employee = employeeRepository.findById(id).orElseThrow(()->new EmployeeResourceNotFoundException("employee id doesn't found"));
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        employeeRepository.save(employee);
        return employeeMapper.mapToEmployeeDto(employee);   
    }
    @Override
    public void deleteEmployeeById(Long id) {
	Employee employee = employeeRepository.findById(id).orElseThrow(()->new EmployeeResourceNotFoundException("employee id doesn't found"));
	  employeeRepository.deleteById(id);
}


}
