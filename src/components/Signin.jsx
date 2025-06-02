import { use, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { userLogin } from '../api';
import Button from './Button';

const Signin = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('emilys');
  const [userPassword, setuserPassword] = useState('emilyspass');
  const [accepted, setAccepted] = useState(false);

  const handleSignIn = async () => {
    try {
      const data = await userLogin(userName, userPassword);
      if(data && data.accessToken) {
        dispatch(setUser(data));
      }
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
      {/* <button
        onClick={handleSignInClick}
        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-400 transition"
      >
        Sign In
      </button> */}
      <Button title={'SignIn'} onclick={handleSignInClick}/>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50 flex flex-col">

          <div className="bg-white rounded-2xl shadow-xl w-11/12 max-w-md p-6">
            <form className="space-y-6 bg-white" action="#" method="POST">
              <div>
                <label for="email" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div class="mt-1">
                  <input id="email" name="email" type="email" autocomplete="email" required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="emilys"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} />
                </div>
              </div>

              <div>
                <label for="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div class="mt-1">
                  <input id="password" name="password" type="password" autocomplete="current-password" required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="emilyspass"
                    value={userPassword}
                    onChange={(e) => setuserPassword(e.target.value)} />
                </div>
              </div>
            </form>
            <h2 className="text-xl font-semibold mb-4 text-center">Terms & Conditions</h2>
            <p className="text-gray-700 text-sm mb-4">
              By clicking "Accept", you agree to the following:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-6 space-y-1">
              <li>You will follow community guidelines.</li>
              <li>You agree to our privacy policy.</li>
              <li>You will not misuse the platform.</li>
            </ul>
            <input type="checkbox" onClick={() => setAccepted(true)} className=''/>
            <p className='text-gray-400 inline pl-2 hover:font-semibold'>I accept all the terms and conditions.</p>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-xl hover:bg-red-400 transition"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className={`px-4 py-2 ${!accepted ? 'bg-gray-300' : 'bg-green-500 hover:cursor-pointer'} text-white rounded-xl transition`}
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
