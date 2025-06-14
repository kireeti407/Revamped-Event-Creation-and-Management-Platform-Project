import { useState, useCallback } from 'react';
import { Upload, X, Image, File } from 'lucide-react';

const Media = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    images: data.images || [],
    banner: data.banner || null
  });

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      const newImages = [...formData.images];
      
      imageFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push({
            id: Date.now() + Math.random(),
            file: file,
            preview: e.target.result,
            name: file.name,
            size: file.size
          });
          
          const updatedData = { ...formData, images: newImages };
          setFormData(updatedData);
          updateData(updatedData);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (imageId) => {
    const newImages = formData.images.filter(img => img.id !== imageId);
    const updatedData = { ...formData, images: newImages };
    setFormData(updatedData);
    updateData(updatedData);
  };

  const setBanner = (image) => {
    const updatedData = { ...formData, banner: image };
    setFormData(updatedData);
    updateData(updatedData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Photos & Media</h2>
        <p className="text-gray-600">
          Make your event stand out with great visuals
        </p>
      </div>

      <div className="space-y-6">
        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900">
              Drag and drop your images here
            </p>
            <p className="text-gray-600">
              or click to browse files
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              <Image className="w-4 h-4 mr-2" />
              Choose Files
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            PNG, JPG, GIF up to 10MB each
          </p>
        </div>

        {/* Image Preview Grid */}
        {formData.images.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Uploaded Images ({formData.images.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.images.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-lg flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                      <button
                        onClick={() => setBanner(image)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                      >
                        Set as Banner
                      </button>
                      <button
                        onClick={() => removeImage(image.id)}
                        className="bg-red-500 text-white p-1.5 rounded hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Banner Badge */}
                  {formData.banner && formData.banner.id === image.id && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Banner
                    </div>
                  )}
                  
                  {/* File Info */}
                  <div className="mt-2">
                    <p className="text-sm text-gray-900 truncate">{image.name}</p>
                    <p className="text-xs text-gray-500">
                      {(image.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Banner Preview */}
        {formData.banner && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Event Banner</h3>
            <div className="relative max-w-2xl">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={formData.banner.preview}
                  alt="Event banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setBanner(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <h4 className="font-medium text-indigo-900 mb-2">📸 Photo Tips</h4>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Use high-quality images that represent your event well</li>
            <li>• The banner image will be prominently displayed on your event page</li>
            <li>• Include photos of the venue, speakers, or similar past events</li>
            <li>• Avoid text-heavy images as they may not be readable on mobile</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Media;