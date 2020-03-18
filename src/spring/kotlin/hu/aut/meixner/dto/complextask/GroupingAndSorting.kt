package hu.aut.meixner.dto.complextask

import hu.aut.meixner.dto.easytask.Group
import hu.aut.meixner.dto.easytask.Sorting

class GroupingAndSorting<T> : Sorting<Group<T>>(
        elements = mutableListOf()
)