import { useState } from 'react';
import { adminAPI } from '../../api/api';
import { Upload, FileText, CheckCircle, AlertTriangle, Loader } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upload CSV</h1>
        <p className="text-gray-600 mt-1">Bulk import complaints from CSV file</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Upload className="h-5 w-5 mr-2" />
            Upload CSV File
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CSV File Format
              </label>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  Required columns: <code className="bg-white px-2 py-1 rounded">text</code>,{' '}
                  <code className="bg-white px-2 py-1 rounded">location</code>,{' '}
                  <code className="bg-white px-2 py-1 rounded">timestamp</code>
                </p>
                <p className="text-xs text-gray-500">
                  Example:
                </p>
                <pre className="text-xs bg-white p-2 rounded mt-2 overflow-x-auto">
{`text,location,timestamp
"Water leak in main street","Colombo 05","2024-01-15T10:30:00Z"
"Pothole on Galle Road","Colombo 03","2024-01-15T11:00:00Z"`}
                </pre>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select CSV File
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                <input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="csv-file"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <FileText className="h-12 w-12 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {file ? file.name : 'Click to select CSV file'}
                  </span>
                  <span className="text-xs text-gray-500">CSV files only</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Upload & Process</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Processing Results
          </h2>

          {result ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-900">Processed</span>
                  </div>
                  <p className="text-2xl font-bold text-green-700">
                    {result.processedCount || 0}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-orange-900">Urgent</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-700">
                    {result.urgentCount || 0}
                  </p>
                </div>
              </div>

              {result.categorySummary && Object.keys(result.categorySummary).length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Category Breakdown</h3>
                  <div className="space-y-2">
                    {Object.entries(result.categorySummary).map(([category, count]) => (
                      <div
                        key={category}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm text-gray-700 capitalize">{category}</span>
                        <span className="font-semibold text-gray-900">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <button
                  onClick={() => setResult(null)}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear Results
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Upload a CSV file to see processing results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUploadCSV;

