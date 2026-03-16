export default function LoginScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-blue-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-brand-900 mb-2 font-display">TrafficRewards</h1>
        <p className="text-neutral-600 mb-8">Your path to safer driving starts here</p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-900 mb-2">Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter 10-digit number"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 text-white font-semibold py-2.5 rounded-lg hover:bg-brand-700 transition-colors"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
