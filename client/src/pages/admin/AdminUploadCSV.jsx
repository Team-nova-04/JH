import { useState } from 'react';
import { adminAPI } from '../../api/api';
import { Upload, FileText, CheckCircle, AlertTriangle, Loader, Shield, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminUploadCSV = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        toast.error('Please select a CSV file');
        return;
      }
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a CSV file');
      return;
    }

    try {
      setUploading(true);
      const res = await adminAPI.uploadCSV(file);
      setResult(res.data.data);
      toast.success('CSV processed successfully');
      setFile(null);
      // Reset file input
      const fileInput = document.getElementById('csv-file');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload CSV');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FDE68A] to-[#FCD34D] rounded-full blur-xl opacity-60"></div>
              <div className="relative bg-gradient-to-br from-[#8D153A] to-[#00534E] p-4 rounded-3xl shadow-2xl">
                <Upload className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-[#8D153A] to-[#00534E] bg-clip-text mb-4">
            Bulk Complaint Upload
          </h1>
          <p className="max-w-3xl mx-auto text-2xl leading-relaxed text-gray-700">
            Import multiple complaints efficiently using CSV files with AI-powered processing
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Upload Section */}
          <div className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-800">
              <FileText className="h-8 w-8 mr-3 text-[#8D153A]" />
              Upload CSV File
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block mb-3 text-sm font-semibold text-gray-700">
                  CSV File Format Requirements
                </label>
                <div className="p-6 border bg-white/40 rounded-2xl border-white/60">
                  <p className="mb-3 text-sm text-gray-700">
                    Required columns: <code className="bg-[#8D153A]/10 text-[#8D153A] px-2 py-1 rounded font-mono">text</code>,{' '}
                    <code className="bg-[#8D153A]/10 text-[#8D153A] px-2 py-1 rounded font-mono">location</code>,{' '}
                    <code className="bg-[#8D153A]/10 text-[#8D153A] px-2 py-1 rounded font-mono">timestamp</code>
                  </p>
                  <p className="mb-2 text-xs font-semibold text-gray-600">
                    Example CSV Structure:
                  </p>
                  <pre className="p-4 overflow-x-auto font-mono text-xs border bg-white/60 rounded-xl border-white/60">
{`text,location,timestamp
"Water leak in main street","Colombo 05","2024-01-15T10:30:00Z"
"Pothole on Galle Road","Colombo 03","2024-01-15T11:00:00Z"
"Garbage accumulation in park","Kandy","2024-01-15T12:00:00Z"`}
                  </pre>
                </div>
              </div>

              <div>
                <label className="block mb-3 text-sm font-semibold text-gray-700">
                  Select CSV File
                </label>
                <div className="border-2 border-dashed border-white/60 rounded-2xl p-8 text-center bg-white/40 hover:border-[#8D153A]/40 transition-all duration-300 cursor-pointer">
                  <input
                    id="csv-file"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="csv-file"
                    className="flex flex-col items-center space-y-3 cursor-pointer"
                  >
                    <FileText className="w-16 h-16 text-gray-400" />
                    <div className="text-center">
                      <span className="block text-lg font-semibold text-gray-700">
                        {file ? file.name : 'Choose CSV File'}
                      </span>
                      <span className="mt-1 text-sm text-gray-600">or drag and drop</span>
                    </div>
                    <span className="px-3 py-1 text-xs text-gray-500 border rounded-full bg-white/60 border-white/60">
                      .csv files only • Max 10MB
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="group relative w-full bg-gradient-to-r from-[#8D153A] to-[#00534E] text-white py-4 px-6 rounded-xl font-bold hover:from-[#00534E] hover:to-[#8D153A] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform group-hover:translate-x-[100%] transition-all duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {uploading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Processing CSV File...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>Upload & Process CSV</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-8 border shadow-xl bg-white/60 backdrop-blur-md border-white/40 rounded-3xl">
            <h2 className="flex items-center mb-6 text-3xl font-bold text-gray-800">
              <BarChart3 className="h-8 w-8 mr-3 text-[#00534E]" />
              Processing Results
            </h2>

            {result ? (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 border bg-white/40 rounded-2xl border-white/60">
                    <div className="flex items-center mb-3 space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="font-bold text-gray-800">Successfully Processed</span>
                    </div>
                    <p className="text-3xl font-bold text-green-700">
                      {result.processedCount || 0}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">complaints imported</p>
                  </div>
                  <div className="p-6 border bg-white/40 rounded-2xl border-white/60">
                    <div className="flex items-center mb-3 space-x-3">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                      <span className="font-bold text-gray-800">Urgent Priority</span>
                    </div>
                    <p className="text-3xl font-bold text-orange-700">
                      {result.urgentCount || 0}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">require immediate attention</p>
                  </div>
                </div>

                {/* Category Breakdown */}
                {result.categorySummary && Object.keys(result.categorySummary).length > 0 && (
                  <div className="p-6 border bg-white/40 rounded-2xl border-white/60">
                    <h3 className="flex items-center mb-4 font-bold text-gray-800">
                      <Shield className="h-5 w-5 mr-2 text-[#8D153A]" />
                      Category Distribution
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(result.categorySummary).map(([category, count]) => (
                        <div
                          key={category}
                          className="flex items-center justify-between p-3 border bg-white/60 rounded-xl border-white/60"
                        >
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {category.replace('_', ' ')}
                          </span>
                          <span className="font-bold text-[#8D153A] bg-[#8D153A]/10 px-3 py-1 rounded-full">
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clear Results */}
                <div className="pt-4 border-t border-white/60">
                  <button
                    onClick={() => setResult(null)}
                    className="text-sm font-semibold text-[#8D153A] hover:text-[#00534E] transition-colors duration-300"
                  >
                    Clear Results & Upload Another
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center border bg-white/40 rounded-2xl border-white/60">
                <FileText className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                <h3 className="mb-2 text-xl font-bold text-gray-800">No Results Yet</h3>
                <p className="max-w-sm mx-auto text-gray-600">
                  Upload a CSV file to see AI-powered processing results and analytics
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-[#8D153A] to-[#00534E] rounded-3xl shadow-2xl p-8 text-white">
          <h2 className="mb-6 text-3xl font-bold text-center">How CSV Processing Works</h2>
          <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
            <div>
              <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-white/20 rounded-2xl">
                <FileText className="h-8 w-8 text-[#FFBE29]" />
              </div>
              <h3 className="mb-2 text-lg font-bold">Upload CSV</h3>
              <p className="text-sm text-white/90">Upload your properly formatted CSV file with complaint data</p>
            </div>
            <div>
              <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-white/20 rounded-2xl">
                <Shield className="h-8 w-8 text-[#FFBE29]" />
              </div>
              <h3 className="mb-2 text-lg font-bold">AI Analysis</h3>
              <p className="text-sm text-white/90">Our AI automatically categorizes and prioritizes each complaint</p>
            </div>
            <div>
              <div className="flex items-center justify-center w-16 h-16 p-4 mx-auto mb-4 bg-white/20 rounded-2xl">
                <CheckCircle className="h-8 w-8 text-[#FFBE29]" />
              </div>
              <h3 className="mb-2 text-lg font-bold">Instant Results</h3>
              <p className="text-sm text-white/90">Get detailed analytics and processing results immediately</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUploadCSV;