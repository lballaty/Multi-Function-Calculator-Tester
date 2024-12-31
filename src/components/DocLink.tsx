import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function DocLink() {
  return (
    <Link
      to="/documentation"
      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
    >
      <BookOpen className="h-4 w-4" />
      <span>Documentation</span>
    </Link>
  );
}