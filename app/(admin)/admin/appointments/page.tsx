import AppointmentsTable from '@/components/admin/appointments/AppointmentsTable'
import PageBreadcrumb from '@/components/admin/PageBreadcrumb'

function page() {
  return (
    <div>
      <PageBreadcrumb
        title="Appointments"
        name="Appointments"
        breadCrumbItems={[
          { label: "Home", href: "/" },
          { label: "Admin", href: "/admin" },
          { label: "Appointments" },
      ]}/>
        <AppointmentsTable/>
    </div>
  )
}

export default page