import { createFeatureSelector, createSelector } from '@ngrx/store'
import { BooksState } from '../reducers/books.reducers'
import { BookDto } from '../dto/book.dto'

export const selectBooksState = createFeatureSelector<BooksState>('books')

export const selectBooks = createSelector(
  selectBooksState,
  (state) => state.books
)

export const selectBooksLoading = createSelector(
  selectBooksState,
  (state) => state.loading
)

export const selectBooksError = createSelector(
  selectBooksState,
  (state) => state.error
)

export const selectBookById = (bookId: string) =>
  createSelector(selectBooksState, (state) =>
    state.books.find((book) => book.isbn === bookId)
  )

export const selectFilterCriteria = createSelector(
  selectBooksState,
  (state) => state.filterCriteria
)
export const selectSearchTerm = createSelector(
  selectBooksState,
  (state) => state.search
)

export const selectFilteredBooksBySearch = createSelector(
  selectBooks,
  selectSearchTerm,
  (books, searchTerm) => {
    if (!searchTerm) {
      return books
    }

    const lowerSearchTerm = preprocessString(searchTerm)
    return books.filter((book) =>
      Object.values(book).some(
        (value) =>
          value && preprocessString(value.toString()).includes(lowerSearchTerm)
      )
    )
  }
)

//This way, items will only be included in the results if they match all the applied filter criteria with AND
export const selectFilteredBooks = createSelector(
  selectBooks,
  selectFilterCriteria,
  (items, filterCriteria) => {
    const isFilterNull =
      filterCriteria &&
      Object.values(filterCriteria).every((val) => val === null)

    if (!filterCriteria || isFilterNull) {
      return items
    }

    return items.filter((item) => {
      return Object.entries(filterCriteria).every(([field, filterValue]) => {
        if (!filterValue) {
          return true
        }

        if (field === 'published') {
          const year = new Date(item[field]).getFullYear().toString()
          return year === filterValue.toString()
        }

        if (field === 'categories') {
          const itemCategories = item[field]
            ?.split(',')
            .map((value) => value.trim().toLowerCase())
          const filterCategories = filterValue
            .split(',')
            .map((value: string) => value.trim().toLowerCase())
          return filterCategories.some(
            (filterCategory: string) => itemCategories?.includes(filterCategory)
          )
        }
        const fieldValue = item[field as keyof BookDto]
        return compareField(fieldValue, filterValue)
      })
    })
  }
)

function compareField(
  fieldValue: string | number | undefined,
  filterValue: string | number | undefined
): boolean {
  if (!filterValue) {
    return false
  }
  if (typeof fieldValue === 'number' && typeof filterValue === 'number') {
    return fieldValue === filterValue
  }

  if (typeof fieldValue === 'string') {
    if (fieldValue === null) {
      return false
    }

    const fieldValueStr = preprocessString(fieldValue.toString())
    const filterValueStr = preprocessString(filterValue.toString())

    return fieldValueStr === filterValueStr
  }

  return false
}
function preprocessString(str: string): string {
  str = str.toLowerCase()
  str = str.replace(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\s]/g, '')
  return str
}
