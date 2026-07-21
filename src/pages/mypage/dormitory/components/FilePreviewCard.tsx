import { useEffect, useState } from "react";

import { IconButton } from "@/components/iconButton/IconButton";

import CloseIcon from "@/assets/icons/CloseIcon.svg?react";

export interface FilePreviewCardProps {
  file: File;
  onRemove: () => void;
}

export function FilePreviewCard({ file, onRemove }: FilePreviewCardProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file.type.startsWith("image/")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    // Object URLs are an external browser resource: creating and revoking
    // them must happen together in the same effect run, or React's Strict
    // Mode double-invoke (mount -> cleanup -> mount) revokes the URL the
    // <img> ends up using.
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="flex w-39 flex-col overflow-hidden rounded-sm bg-bg-5">
      <div className="flex size-39 items-center justify-center overflow-hidden bg-bg-4">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={file.name}
            className="size-full object-cover"
          />
        ) : (
          <span role="img" aria-label="파일" className="text-5xl leading-none">
            📄
          </span>
        )}
      </div>
      <div className="flex items-center justify-between gap-xxs pl-l">
        <p className="min-w-0 flex-1 truncate text-body-2 text-text-1">
          {file.name}
        </p>
        <IconButton
          aria-label="파일 삭제"
          icon={<CloseIcon />}
          onClick={onRemove}
          className="text-error hover:bg-transparent active:bg-transparent"
        />
      </div>
    </div>
  );
}
