import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  MessageSquare, 
  Plus, 
  Image as ImageIcon, 
  Send, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  X
} from 'lucide-react';
import { CommunityPost, TravelerProfile } from '../types';

interface CommunityViewProps {
  posts: CommunityPost[];
  currentUser: TravelerProfile;
  onAddPost: (post: Partial<CommunityPost>) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ posts, currentUser, onAddPost }) => {
  const [localPosts, setLocalPosts] = useState<CommunityPost[]>(posts);
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [destinationTag, setDestinationTag] = useState('Munnar, Kerala');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const handleToggleLike = (postId: string) => {
    setLocalPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = !p.userLiked;
        return {
          ...p,
          userLiked: liked,
          likesCount: liked ? p.likesCount + 1 : p.likesCount - 1
        };
      }
      return p;
    }));
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setLocalPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newComments = [
          ...(p.comments || []),
          {
            id: 'c-' + Date.now(),
            authorName: currentUser.name,
            authorAvatar: currentUser.avatar,
            text,
            createdAt: 'Just now'
          }
        ];
        return {
          ...p,
          comments: newComments,
          commentsCount: newComments.length
        };
      }
      return p;
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCreatePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    const newPost: CommunityPost = {
      id: 'post-' + Date.now(),
      author: currentUser,
      destination: destinationTag,
      createdAt: 'Just now',
      content: postContent,
      images: ['assets/images/destinations/kodaikanal.jpg'],
      likesCount: 1,
      commentsCount: 0,
      userLiked: true,
      comments: []
    };

    setLocalPosts([newPost, ...localPosts]);
    onAddPost(newPost);
    setPostContent('');
    setNewPostModalOpen(false);
  };

  return (
    <div id="community-view-wrapper" className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="bg-emerald-950 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-800 inline-flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> Traveler Feed
          </span>
          <h1 className="text-2xl font-extrabold text-stone-100">Strangers Trip Community</h1>
          <p className="text-xs text-stone-400">Share trip memories, ask destination tips, and meet future trip mates.</p>
        </div>

        <button
          id="btn-open-create-post-modal"
          onClick={() => setNewPostModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold px-5 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg transition-transform hover:scale-105 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Share Story</span>
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {localPosts.map((post) => (
          <div key={post.id} className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-xl space-y-4">
            
            {/* Author Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-600/50"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-stone-100">{post.author.name}</h4>
                    <span className="text-[9px] bg-stone-800 text-stone-400 font-bold px-2 py-0.5 rounded uppercase">Demo</span>
                  </div>
                  <p className="text-[11px] text-stone-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{post.destination} • {post.createdAt}</span>
                  </p>
                </div>
              </div>

              {post.tripTitle && (
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800 font-semibold hidden sm:inline">
                  {post.tripTitle}
                </span>
              )}
            </div>

            {/* Content */}
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            {/* Image */}
            {post.images && post.images.length > 0 && (
              <div className="rounded-2xl overflow-hidden h-64 sm:h-80 bg-stone-950 border border-stone-800">
                <img src={post.images[0]} alt="Post media" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Like and Comment Stats */}
            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <div className="flex items-center gap-4">
                <button
                  id={`btn-like-post-${post.id}`}
                  onClick={() => handleToggleLike(post.id)}
                  className={`flex items-center gap-1.5 font-semibold transition-colors ${
                    post.userLiked ? 'text-rose-400' : 'hover:text-stone-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-rose-400' : ''}`} />
                  <span>{post.likesCount} Likes</span>
                </button>

                <div className="flex items-center gap-1.5 font-semibold">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{post.commentsCount} Comments</span>
                </div>
              </div>
            </div>

            {/* Comments List */}
            {post.comments && post.comments.length > 0 && (
              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-850 space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2.5 text-xs">
                    <img src={comment.authorAvatar} alt={comment.authorName} className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5" />
                    <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-stone-200">{comment.authorName}</strong>
                        <span className="text-[10px] text-stone-500">{comment.createdAt}</span>
                      </div>
                      <p className="text-stone-300">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Form */}
            <form onSubmit={(e) => handleAddComment(post.id, e)} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-600 hover:bg-emerald-500 text-stone-950 rounded-xl font-bold transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {newPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setNewPostModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-stone-100">Create Community Post</h3>

            <form onSubmit={handleCreatePostSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-stone-400 block mb-1">Destination Tag</label>
                <input
                  type="text"
                  value={destinationTag}
                  onChange={(e) => setDestinationTag(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs text-stone-400 block mb-1">Your Story / Question</label>
                <textarea
                  rows={4}
                  required
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share a tip, photo story, or ask who is going to Munnar next month..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center gap-2 text-xs text-stone-400">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>Sample photo auto-attached for demo.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold rounded-xl text-xs"
              >
                Publish Demo Post
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
