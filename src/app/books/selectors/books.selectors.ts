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
  (state) => state.isLoaded
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

export const selectBooksBySameCategories = (bookId: string) =>
  createSelector(selectBooks, (books) => {
    const selectedBook = books.find((book) => book.isbn === bookId)
    if (!selectedBook) {
      return []
    }
    return books.filter(
      (book) =>
        book.categories
          ?.split(',')
          .some(
            (category) =>
              selectedBook.categories
                ?.split(',')
                .some(
                  (selectedCategory) =>
                    preprocessString(selectedCategory) ===
                    preprocessString(category)
                ) && book.isbn !== selectedBook.isbn
          )
    )
  })
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

/* Selects books with a search approach for text fields, and applies an "AND" operator
 when filtering based on other fields*/

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

    return fieldValueStr.includes(filterValueStr) // if it is subset and not strickly equal
  }

  return false
}

/* Converts the input string to lowercase and removes certain characters
to improve searchability and consistency.*/
function preprocessString(searchStr: string): string {
  searchStr = searchStr.toLowerCase()
  searchStr = searchStr.replace(/['!@#$%^&*()_+{}\[\]:;<>,.?~\\/\s]/g, '')
  return searchStr
}
