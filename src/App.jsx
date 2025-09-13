import AppView from "../src/views/dashboard/app-view"
import { Toaster } from "sonner"

export default function Page() {
  return (
    <>
      <AppView />
      <Toaster 
        position="top-right" 
        richColors 
        expand={true}
        closeButton
        toastOptions={{
          duration: 4000,
        }}
      />
    </>
  )
}