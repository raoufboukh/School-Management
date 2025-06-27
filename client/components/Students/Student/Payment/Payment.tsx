import { tablePayment } from "@/components/constants";
import Link from "next/link";
import { MdPayment } from "react-icons/md";

const Payment = ({
  formatDate,
  getAttendanceRate,
  payments,
  studentId,
}: any) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Payment History</h3>
        <Link href={`/payments/new?studentId=${studentId}`}>
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <MdPayment />
            New Payment
          </button>
        </Link>
      </div>

      {payments && payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                {tablePayment.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-900"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment: any) => (
                <tr key={payment._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {payment.subject}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {payment.teacherId.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    ${payment.amount}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {payment.totalSessionsPaid}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {payment.sessionsRemaining}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {getAttendanceRate(payment)}%
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {formatDate(payment.paymentDate)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {payment.isActive ? "Active" : "Completed"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <MdPayment className="mx-auto text-4xl mb-2" />
          <p>No payment records found</p>
        </div>
      )}
    </div>
  );
};

export default Payment;
