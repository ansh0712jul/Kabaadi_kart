import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Button } from '@/components/ui/button';

function ProfilePage() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(user);

  return (
    <>
      <div className="min-h-screen bg-black text-gray-100">
        <Header />
        <main className="px-4 py-12 pt-24">
          <div className="px-4 py-8">
            <h1 className="text-3xl font-semibold text-white">Profile</h1>
            <div className="mt-6">
              <div className="bg-white p-6 rounded-lg shadow-md w-full mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Name</span>
                    <span className="text-gray-800">{user.name}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-600">Email</span>
                    <span className="text-gray-800">{user.email}</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <h2 className="text-xl font-semibold text-gray-800">Pickup Request</h2>
                  <div className="mt-4">
                    <img src='' alt="Pickup" className="w-24 h-24 rounded-full mx-auto mb-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Phone Number</span>
                      <span className="text-gray-800">998778785458</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-600">Name</span>
                      <span className="text-gray-800">John</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-600">Email</span>
                      <span className="text-gray-800">John@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-600">Collector Name</span>
                      <span className="text-gray-800">John2</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-600">Collector Phone Number</span>
                      <span className="text-gray-800">69659854</span>
                    </div>
                    <Button className="mt-5 w-36 text-md shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">Complete</Button>
                    <Button className="ml-3 mt-5 w-36 text-md shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">Cancel</Button>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  <h2 className="text-xl font-semibold text-gray-800">Pickup Request</h2>
                  <div className="mt-4">
                    <img src='' alt="Pickup" className="w-24 h-24 rounded-full mx-auto mb-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Phone Number</span>
                      <span className="text-gray-800"></span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-600">Name</span>
                      <span className="text-gray-800">John2</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-600">Email</span>
                      <span className="text-gray-800">John@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-600">Collector Name</span>
                      <span className="text-gray-800">John2</span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-600">Collector Phone Number</span>
                      <span className="text-gray-800">69659854</span>
                    </div>
                    <Button className="mt-5 w-36 text-md shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">Complete</Button>
                    <Button className="ml-3 mt-5 w-36 text-md shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white">Cancel</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default ProfilePage;