export default defineEventHandler((event) => {
  const petId = Number.parseInt(getRouterParam(event, 'petId') || '1')
  const acceptHeader = getHeader(event, 'Accept') || ''

  const basePet = {
    id: petId,
    name: 'doggie',
    category: {
      id: 1,
      name: 'Dogs',
    },
    photoUrls: [
      'https://example.com/photos/dog1.jpg',
      'https://example.com/photos/dog2.jpg',
    ],
    tags: [
      {
        id: 1,
        name: 'friendly',
      },
      {
        id: 2,
        name: 'vaccinated',
      },
    ],
    status: 'available' as const,
  }

  if (acceptHeader.includes('application/vnd.petstore.v2+json')) {
    return {
      ...basePet,
      breed: 'Labrador',
      age: 3,
      owner: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    }
  }

  return basePet
})
