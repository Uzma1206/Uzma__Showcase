import { useState } from 'react';
import {
  uploadFile,
  uploadVideoToCloudinary,
  createMemory,
  updateMemory,
} from '../../firebase/services';
import { Upload } from 'lucide-react';

const CATEGORIES = [
  'Memories',
  'Special Moments',
  'Late Night Talks',
  'Favorite Days',
  'Trips',
  'Random Chaos',
  'Photos We Never Posted',
];

export default function MemoryForm({ existing, onDone }) {
  const [data, setData] = useState(
    existing || {
      title: '',
      category: 'Memories',
      caption: '',
      quote: '',
      note: '',
      date: '',
      cover: '',
      backdrop: '',
      video: '',
      soundtrack: '',
      photos: [],
      galleryVideos: [],
    }
  );

  const [coverFile, setCoverFile] = useState(null);
  const [backdropFile, setBackdropFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [galleryVideoFiles, setGalleryVideoFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);

    try {
      let payload = { ...data };

      if (coverFile) {
        setProgress('Uploading cover...');
        payload.cover = await uploadFile(coverFile);
      }

      if (backdropFile) {
        setProgress('Uploading backdrop...');
        payload.backdrop = await uploadFile(backdropFile);
      }

      if (videoFile) {
        setProgress('Uploading video...');
        payload.video = await uploadVideoToCloudinary(videoFile);
      }

      if (photoFiles.length) {
        setProgress('Uploading photos...');

        const urls = [];

        for (const f of photoFiles) {
          urls.push(await uploadFile(f));
        }

        payload.photos = [...(payload.photos || []), ...urls];
      }
      if (galleryVideoFiles.length) {
        setProgress('Uploading gallery videos...');

        const videoUrls = [];

        for (const file of galleryVideoFiles) {
          videoUrls.push(
            await uploadVideoToCloudinary(file)
    );
  }

  payload.galleryVideos = [
    ...(payload.galleryVideos || []),
    ...videoUrls,
  ];
}

      setProgress('Saving...');

      if (existing?.id) {
        await updateMemory(existing.id, payload);
      } else {
        await createMemory(payload);
      }

      onDone?.();
    } catch (e) {
      console.error(e);
      alert(e.message);
    } finally {
      setBusy(false);
      setProgress('');
    }
  };

  const FileBox = ({ label, file, onPick, accept = 'image/*' }) => (
    <label className="glass rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-ember/50 transition">
      <Upload size={18} className="text-ember" />

      <div className="flex-1">
        <p className="text-xs uppercase tracking-widest text-bone/50">
          {label}
        </p>

        <p className="text-bone/80 text-sm truncate">
          {file ? file.name : 'Choose file...'}
        </p>
      </div>

      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onPick(e.target.files[0])}
      />
    </label>
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          required
          placeholder="Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="glass rounded-xl px-4 py-3 text-bone"
        />

        <select
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
          className="glass rounded-xl px-4 py-3 text-bone"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-ink">
              {c}
            </option>
          ))}
        </select>
      </div>

      <input
        placeholder="Date (e.g. May 2024)"
        value={data.date}
        onChange={(e) => setData({ ...data, date: e.target.value })}
        className="w-full glass rounded-xl px-4 py-3 text-bone"
      />

      <textarea
        placeholder="Caption"
        value={data.caption}
        onChange={(e) => setData({ ...data, caption: e.target.value })}
        rows={2}
        className="w-full glass rounded-xl px-4 py-3 text-bone"
      />

      <textarea
        placeholder="Quote"
        value={data.quote}
        onChange={(e) => setData({ ...data, quote: e.target.value })}
        rows={2}
        className="w-full glass rounded-xl px-4 py-3 text-bone"
      />

      <textarea
        placeholder="Personal note"
        value={data.note}
        onChange={(e) => setData({ ...data, note: e.target.value })}
        rows={3}
        className="w-full glass rounded-xl px-4 py-3 text-bone"
      />

      <input
        placeholder="Soundtrack URL (mp3)"
        value={data.soundtrack}
        onChange={(e) => setData({ ...data, soundtrack: e.target.value })}
        className="w-full glass rounded-xl px-4 py-3 text-bone"
      />

      <div className="grid md:grid-cols-2 gap-4">
        <FileBox
          label="Cover image"
          file={coverFile}
          onPick={setCoverFile}
        />

        <FileBox
          label="Backdrop image"
          file={backdropFile}
          onPick={setBackdropFile}
        />

        <FileBox
          label="Background video"
          file={videoFile}
          onPick={setVideoFile}
          accept="video/*"
        />

        <label className="glass rounded-xl p-4 flex items-center gap-3 cursor-pointer">
          <Upload size={18} className="text-ember" />

          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-bone/50">
              Gallery photos
            </p>

            <p className="text-bone/80 text-sm">
              {photoFiles.length
                ? `${photoFiles.length} selected`
                : 'Choose multiple...'}
            </p>
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setPhotoFiles(Array.from(e.target.files))
            }
          />
        </label>
        

<label className="glass rounded-xl p-4 flex items-center gap-3 cursor-pointer">
  <Upload size={18} className="text-ember" />

  <div className="flex-1">
    <p className="text-xs uppercase tracking-widest text-bone/50">
      Gallery Videos
    </p>

    <p className="text-bone/80 text-sm">
      {galleryVideoFiles.length
        ? `${galleryVideoFiles.length} selected`
        : 'Choose videos...'}
    </p>
  </div>

  <input
    type="file"
    multiple
    accept="video/*"
    className="hidden"
    onChange={(e) =>
      setGalleryVideoFiles(
        Array.from(e.target.files)
      )
    }
  />
</label>
      </div>

      {progress && (
        <p className="text-ember text-sm">{progress}</p>
      )}

      <button
        data-hover
        disabled={busy}
        className="btn-cinema bg-ember text-white px-8 py-3 rounded-lg tracking-widest uppercase text-sm w-full md:w-auto disabled:opacity-50"
      >
        {busy ? 'Working...' : existing ? 'Update Memory' : 'Create Memory'}
      </button>
    </form>
  );
}