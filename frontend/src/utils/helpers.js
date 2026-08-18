export const getImageUrl = (image, width = 800) => {
  if (!image) return '';
  const url = image.secureUrl || image.url;
  if (!url) return '';
  if (url.includes('cloudinary.com') && width) {
    return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
  }
  return url;
};

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getStatusColor = (status) => {
  const colors = {
    New: 'bg-blue-500/20 text-blue-300',
    Contacted: 'bg-yellow-500/20 text-yellow-300',
    'Follow-Up': 'bg-orange-500/20 text-orange-300',
    Quoted: 'bg-purple-500/20 text-purple-300',
    Booked: 'bg-green-500/20 text-green-300',
    Closed: 'bg-gray-500/20 text-gray-300',
    Cancelled: 'bg-red-500/20 text-red-300',
  };
  return colors[status] || 'bg-gray-500/20 text-gray-300';
};
