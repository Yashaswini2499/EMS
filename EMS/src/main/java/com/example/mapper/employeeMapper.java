package com.example.mapper;

import com.example.dto.EmployeeDto;
import com.example.entity.Employee;

public class employeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();

        // ✅ Only set ID if it's not null
        if (employeeDto.getId() != null) {
            employee.setId(employeeDto.getId());
        }

        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());

        return employee;
    }
}
