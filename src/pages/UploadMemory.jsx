import React, { useRef, useState, useEffect } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

export default function UploadMemory() {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [gallery, setGallery] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [lightBoxUrl, setLightBoxUrl] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await api.get('/api/memory/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGallery(res.data);
    } catch (err) {
      toast.error('Could not fetch your memories!');
    }
  };

  const handleCardClick = () => fileInputRef.current.click();

  // When the user selects a file, show the caption input and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setCaption(''); // Reset caption each time
    setUploadedUrl(''); // Reset preview each time
  };

  // Submit both file & caption
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('photo', selectedFile);
    formData.append('caption', caption);

    const token = localStorage.getItem('token');
    try {
      const res = await api.post(
        '/api/memory/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUploadedUrl(res.data.imageUrl);
      setCaption('');
      setSelectedFile(null);
      toast.success('Photo uploaded!');
      fetchGallery(); // Refresh gallery after upload
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed!');
    }
    setUploading(false);
  };

  // For previewing selected file before upload
  const getPreviewUrl = () => {
    if (selectedFile) return URL.createObjectURL(selectedFile);
    return '';
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      {/* Upload card */}
      <div
        className="bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition cursor-pointer"
        onClick={handleCardClick}
        style={{ opacity: uploading ? 0.5 : 1 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">📸 Upload a Memory</h2>
        <p className="text-gray-600">Upload your beautiful moment together.</p>
        {uploading && <div className="text-pink-500 mt-2">Uploading...</div>}
      </div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Show caption textbox and preview only if a file is selected */}
      {selectedFile && (
        <form onSubmit={handleUpload} className="mt-6">
          <div className="text-center mb-2">
            <img
              src={getPreviewUrl()}
              alt="Preview"
              className="mx-auto rounded-lg shadow-lg border max-h-60"
              style={{ maxWidth: '100%', objectFit: 'cover' }}
            />
          </div>
          <textarea
            className="w-full p-3 rounded-lg border mb-2"
            placeholder="Write about this memory (caption)..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={2}
            maxLength={180}
            disabled={uploading}
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Memory'}
          </button>
        </form>
      )}

      {/* Show latest uploaded image */}
      {uploadedUrl && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2 text-pink-600">Your Latest Uploaded Memory</h3>
          <img
            src={uploadedUrl}
            alt="Uploaded memory"
            className="mx-auto rounded-lg shadow-lg border max-h-60"
            style={{ maxWidth: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* All images gallery */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-pink-700 mb-4 text-center">Your Memories Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gallery.length === 0 && (
            <div className="col-span-full text-gray-500 text-center">No memories yet. Upload your first!</div>
          )}
          {gallery.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <img
                src={m.imageUrl}
                alt={`Memory ${i + 1}`}
                className="rounded-lg shadow border mb-2"
                style={{ objectFit: 'cover', width: '100%', height: '180px' }}
                onClick={() => setLightBoxUrl(m.imageUrl)}
              />
              <span className="text-xs text-gray-400">
                {m.uploadedAt ? new Date(m.uploadedAt).toLocaleString() : ''}
              </span>
              {m.caption && (
                <div className="text-xs text-center text-pink-600 mt-1 font-semibold">{m.caption}</div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Lightbox/modal for zooming image */}
      {lightBoxUrl && (
        <div className='fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center' onClick={() => setLightBoxUrl(null)} style={{cursor:'zoom-out'}}>
            <img src={lightBoxUrl} alt="Zoomed" className='max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl' style={{cursor:'zoom in'}}/>
            <button onClick={() => setLightBoxUrl(null)} className='absolute top-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow text-pink-700 font-bold text-lg'>
                &times;
            </button>
        </div>
      )}
    </div>
  );
}
