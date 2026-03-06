export default defineEventHandler(async () => {
  const { $api } = useNitroApp()

  return $api('/pet/{petId}', {
    path: {
      petId: 2,
    },
  })
})
