import { useDispatch, useSelector } from "react-redux";
import OrdersStats from "./OrdersStatistics";
import { useEffect } from "react";
import { getAllUsersAction } from "../../../redux/slices/users/userSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";


const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  // More people...
];

export default function Customers() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllUsersAction());
  },[dispatch])

  const {users} = useSelector((state)=>state?.users?.allUsers)
  const {loading,error} = useSelector((state)=>state?.users)


  return (
    <>
    {error && <ErrorMsg message={error?.message} />}
    {loading && <LoadingComponent/>}
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center"></div>

      <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">
        All Users [ {users?.length} ]
      </h3>
      <div className="-mx-4 mt-3  overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Full name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                Email
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Country
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                City
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Phone
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Postal Code
              </th>
              {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users?.map((person) => (
              <tr key={person?._id}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {person?.fullname}
                  
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {person?.email}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {person?.shippingAddress?.country}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {person?.shippingAddress?.city}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {person?.shippingAddress?.phone}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {person?.shippingAddress?.postalcode}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>

  );
}
