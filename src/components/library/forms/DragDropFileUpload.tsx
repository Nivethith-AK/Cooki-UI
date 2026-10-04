import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudArrowUp, File, Check, Trash } from '@phosphor-icons/react';

export interface FileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
}

export const DragDropFileUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'schema-kernel-v2.json', size: '24.8 KB', progress: 100 },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragging(true);
    else if (e.type === 'dragleave') setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const addFiles = (newFiles: globalThis.File[]) => {
    const items: FileItem[] = newFiles.map((f) => ({
      id: Math.random().toString(36).substring(7),
      name: f.name,
      size: (f.size / 1024).toFixed(1) + ' KB',
      progress: 100,
    }));
    setFiles((prev) => [...prev, ...items]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed transition-all cursor-pointer ${
          isDragging
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
            : 'border-zinc-300 dark:border-white/15 bg-zinc-50 dark:bg-zinc-900/40 hover:border-indigo-400 dark:hover:border-white/30'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) addFiles(Array.from(e.target.files));
          }}
        />
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 mb-3 border border-indigo-500/20 shadow-inner">
          <CloudArrowUp size={24} weight="duotone" />
        </div>
        <p className="text-xs font-semibold text-zinc-900 dark:text-white">
          Drop component artifacts or <span className="text-indigo-500 dark:text-indigo-400">browse</span>
        </p>
        <p className="text-[10px] text-zinc-500 font-mono mt-1">Accepts .TSX, .JSON, .MD, .CSS up to 10MB</p>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between p-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 shadow-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <File size={16} className="text-zinc-400 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-mono font-medium text-zinc-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-[10px] font-mono text-zinc-500">{file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-500 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <Check size={11} weight="bold" /> Ready
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                    className="text-zinc-400 hover:text-rose-500 p-1 rounded-full transition-colors cursor-pointer"
                  >
                    <Trash size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
