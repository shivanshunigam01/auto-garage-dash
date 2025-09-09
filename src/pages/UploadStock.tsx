import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Download, ArrowLeft, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const UploadStock = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'mapping' | 'uploading' | 'complete'>('idle');
  
  // Column mapping state
  const [columnMapping, setColumnMapping] = useState({
    partName: '',
    partNo: '',
    brand: '',
    qoh: '',
    unitPrice: '',
    discount: '',
    taxType: '',
    taxPercent: '',
    hsnCode: '',
    sellingPrice: '',
    vendorName: '',
    inwardDate: '',
    rackNo: ''
  });

  const requiredFields = ['partName', 'qoh', 'unitPrice', 'taxType', 'taxPercent', 'sellingPrice', 'vendorName', 'inwardDate'];
  
  // Mock Excel columns that would be detected from uploaded file
  const mockExcelColumns = [
    'Column A',
    'Column B', 
    'Column C',
    'Column D',
    'Column E',
    'Column F',
    'Column G',
    'Column H',
    'Column I',
    'Column J'
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.includes('excel') || file.type.includes('spreadsheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        setSelectedFile(file);
        setUploadStatus('mapping');
        toast({
          title: "File Selected",
          description: `${file.name} is ready for mapping`
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select an Excel file (.xlsx or .xls)",
          variant: "destructive"
        });
      }
    }
  };

  const handleDownloadTemplate = () => {
    toast({
      title: "Template Downloaded",
      description: "Excel template has been downloaded to your computer"
    });
  };

  const handleUpload = () => {
    // Validate required fields are mapped
    const missingFields = requiredFields.filter(field => !columnMapping[field as keyof typeof columnMapping]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Required Mappings",
        description: `Please map the following required fields: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    setUploadStatus('uploading');
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus('complete');
      toast({
        title: "Stock Uploaded Successfully",
        description: "All stock items have been imported into the system"
      });
    }, 2000);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setColumnMapping({
      partName: '',
      partNo: '',
      brand: '',
      qoh: '',
      unitPrice: '',
      discount: '',
      taxType: '',
      taxPercent: '',
      hsnCode: '',
      sellingPrice: '',
      vendorName: '',
      inwardDate: '',
      rackNo: ''
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Upload Stock</h1>
          <p className="text-muted-foreground">Import stock data from Excel files</p>
        </div>
        <Button variant="outline" onClick={handleDownloadTemplate}>
          <Download className="w-4 h-4 mr-2" />
          Download Template
        </Button>
      </div>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">File Upload</CardTitle>
        </CardHeader>
        <CardContent>
          {uploadStatus === 'idle' && (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <FileSpreadsheet className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium">Upload Excel File</p>
                <p className="text-sm text-muted-foreground">Select an Excel file (.xlsx, .xls) containing your stock data</p>
                <div className="mt-4">
                  <Input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileSelect}
                    className="w-full max-w-sm mx-auto"
                  />
                </div>
              </div>
            </div>
          )}

          {uploadStatus !== 'idle' && selectedFile && (
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="font-medium">Selected File: {selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Column Mapping Section */}
      {uploadStatus === 'mapping' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Column Mapping</CardTitle>
            <p className="text-sm text-muted-foreground">
              Map your Excel columns to the corresponding fields. Fields marked with * are required.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(columnMapping).map(([field, value]) => {
                const isRequired = requiredFields.includes(field);
                const fieldLabels: { [key: string]: string } = {
                  partName: 'Part Name',
                  partNo: 'Part No.',
                  brand: 'Brand',
                  qoh: 'QoH (Quantity on Hand)',
                  unitPrice: 'Unit Price',
                  discount: 'Discount',
                  taxType: 'Tax Type',
                  taxPercent: 'Tax %',
                  hsnCode: 'HSN Code',
                  sellingPrice: 'Selling Price',
                  vendorName: 'Vendor Name',
                  inwardDate: 'Inward Date',
                  rackNo: 'Rack No.'
                };

                return (
                  <div key={field}>
                    <Label htmlFor={field}>
                      {fieldLabels[field]}{isRequired && ' *'}
                    </Label>
                    <Select 
                      value={value} 
                      onValueChange={(newValue) => 
                        setColumnMapping(prev => ({ ...prev, [field]: newValue }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select column" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">-- Not Mapped --</SelectItem>
                        {mockExcelColumns.map((col, index) => (
                          <SelectItem key={index} value={col}>{col}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}
            </div>

            {/* Preview Row */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">Mapping Preview</h4>
              <div className="text-sm text-muted-foreground">
                {uploadStatus === 'mapping' && (
                  <p>Preview row will appear here after file analysis...</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Progress */}
      {uploadStatus === 'uploading' && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-8 h-8 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="font-medium">Uploading stock data...</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-brand-blue h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <p className="text-sm text-muted-foreground">Processing records... Please wait.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Complete */}
      {uploadStatus === 'complete' && (
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-700">Upload Complete!</h3>
                <p className="text-sm text-muted-foreground">
                  Successfully imported 156 stock items from {selectedFile?.name}
                </p>
              </div>
              <Button onClick={resetUpload}>
                Upload Another File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Display */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {uploadStatus === 'idle' && 'No file uploaded yet'}
          {uploadStatus === 'mapping' && 'Map columns to proceed with upload'}
          {uploadStatus === 'uploading' && 'Upload in progress...'}
          {uploadStatus === 'complete' && 'Upload completed successfully'}
        </p>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => navigate('/stock')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        {uploadStatus === 'mapping' && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetUpload}>
              Cancel
            </Button>
            <Button variant="brand" onClick={handleUpload}>
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadStock;