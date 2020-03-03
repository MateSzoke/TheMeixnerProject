package hu.aut.meixner.dto

class SortingAndGrouping<T> : Grouping<Sorting<T>>(
        groups = mutableListOf()
)