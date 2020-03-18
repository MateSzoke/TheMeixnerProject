package hu.aut.meixner.dto.complextask

import hu.aut.meixner.dto.easytask.Grouping
import hu.aut.meixner.dto.easytask.Sorting

class SortingAndGrouping<T> : Grouping<Sorting<T>>(
        groups = mutableListOf()
)