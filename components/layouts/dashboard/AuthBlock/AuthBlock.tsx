import { Modal } from "@components/common";
import { SignInForm } from "@components/auth";

const AuthBlock: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 h-full w-full sm:pl-64">
      <Modal showModal={true} disableClose>
        <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200 md:dark:border-gray-500">
          <div className="border-b border-gray-200 bg-white py-6 pt-8 text-center dark:border-gray-500 dark:bg-gray-800 dark:text-white">
            <h3 className="font-display text-2xl font-bold">Sign In</h3>
          </div>
          <SignInForm />
        </div>
      </Modal>
    </div>
  );
};

export default AuthBlock;
