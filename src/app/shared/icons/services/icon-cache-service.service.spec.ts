import { TestBed } from '@angular/core/testing'
import { IconsCacheService } from './icon-cache-service.service'

describe('IconCacheServiceService', () => {
  let service: IconsCacheService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(IconsCacheService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
