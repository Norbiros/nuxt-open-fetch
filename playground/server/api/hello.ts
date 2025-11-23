export default defineEventHandler(async () => {
  // @ts-ignore Workaround to add another property to NitroApp
  const { $api } = useNitroApp()

  return $api('/pet/{petId}', {
    path: {
      petId: 2,
    },
  })
})
