import { useContext, useState } from 'react';
import { useUserContext } from '../contexts/useUserContext';

const Signin = () => {
  const [showModal, setShowModal] = useState(false);
  const { setUser } = useContext(useUserContext);

  const handleSignIn = async () => {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30, 
        }),
      });
      const data = await res.json();
      setUser(data);
      console.log(data);
      return data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleSignInClick = () => {
    setShowModal(true);
  };

  const handleAccept = () => {
    setShowModal(false);
    handleSignIn();
    console.log("Signed in after accepting terms");
  };

  return (
    <div className='text-white font-semibold rounded-lg shadow-md hover:cursor-pointer'>
      <button
        onClick={handleSignInClick}
        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-400 transition"
      >
        Sign In
      </button>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-center">Terms & Conditions</h2>
            <p className="text-gray-700 text-sm mb-4">
              By clicking "Accept", you agree to the following:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-6 space-y-1">
              <li>You will follow community guidelines.</li>
              <li>You agree to our privacy policy.</li>
              <li>You will not misuse the platform.</li>
            </ul>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signin;
