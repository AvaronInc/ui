
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, ThumbsUp, Rocket, MessageSquare, Paperclip, MoreVertical, Pin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Post, User } from '../../types';
import ReactMarkdown from 'react-markdown';
import PostComments from './PostComments';
import { toast } from 'sonner';

interface PostItemProps {
  post: Post;
  currentUser: User;
  onTogglePin: (postId: string) => void;
  onAddReaction: (postId: string, reactionType: string) => void;
}

const PostItem = ({ post, currentUser, onTogglePin, onAddReaction }: PostItemProps) => {
  const [showComments, setShowComments] = useState(false);
  
  const handleReaction = (type: 'like' | 'heart' | 'rocket' | 'laugh') => {
    onAddReaction(post.id, type);
    // Show toast for visual feedback
    toast.success(`You reacted with ${type} to "${post.title}"`);
  };
  
  const handleTogglePin = () => {
    onTogglePin(post.id);
    toast.success(post.isPinned ? 'Post unpinned' : 'Post pinned');
  };
  
  const hasReacted = (type: 'like' | 'heart' | 'rocket' | 'laugh') => {
    return post.reactions[type].reactedBy.includes(currentUser.id);
  };
  
  return (
    <div className="bg-card rounded-lg shadow-sm border p-4 mb-4">
      {/* Post Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-xs text-muted-foreground">{post.author.department} • {formatDistanceToNow(post.timestamp)} ago</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {post.isPinned && (
            <Pin size={16} className="text-primary" />
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {(currentUser.role.includes('Admin') || post.author.id === currentUser.id) && (
                <>
                  <DropdownMenuItem onClick={handleTogglePin}>
                    {post.isPinned ? 'Unpin Post' : 'Pin Post'}
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit Post</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Delete Post</DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
              <DropdownMenuItem>Report Post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Post Title */}
      <h3 className="text-lg font-medium mb-2">{post.title}</h3>
      
      {/* Post Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">
            #{tag}
          </Badge>
        ))}
      </div>
      
      {/* Post Content */}
      <div className="mb-4 prose prose-sm max-w-none dark:prose-invert">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      
      {/* Attachments */}
      {post.attachments && post.attachments.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Attachments</h4>
          <div className="space-y-2">
            {post.attachments.map(attachment => (
              <div key={attachment.id} className="flex items-center gap-2 p-2 bg-muted rounded-md text-sm">
                <Paperclip size={16} />
                <span className="flex-1 truncate">{attachment.name}</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Reactions & Comment Count */}
      <div className="flex justify-between items-center py-2 border-t">
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 px-2 gap-1 ${hasReacted('like') ? 'text-primary bg-primary/10' : ''}`}
            onClick={() => handleReaction('like')}
          >
            <ThumbsUp size={16} /> 
            {post.reactions.like.count > 0 && <span>{post.reactions.like.count}</span>}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 px-2 gap-1 ${hasReacted('heart') ? 'text-rose-500 bg-rose-500/10' : ''}`}
            onClick={() => handleReaction('heart')}
          >
            <Heart size={16} /> 
            {post.reactions.heart.count > 0 && <span>{post.reactions.heart.count}</span>}
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 px-2 gap-1 ${hasReacted('rocket') ? 'text-amber-500 bg-amber-500/10' : ''}`}
            onClick={() => handleReaction('rocket')}
          >
            <Rocket size={16} /> 
            {post.reactions.rocket.count > 0 && <span>{post.reactions.rocket.count}</span>}
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1" 
          onClick={() => setShowComments(!showComments)}
        >
          <MessageSquare size={16} />
          {post.comments.length > 0 && <span>{post.comments.length}</span>}
          <span>{showComments ? 'Hide Comments' : 'Comments'}</span>
        </Button>
      </div>
      
      {/* Comments */}
      {showComments && (
        <PostComments
          postId={post.id}
          comments={post.comments}
          currentUser={currentUser}
          onAddComment={(content) => toast.success('Comment added')}
          onReactToComment={(commentId, reaction) => toast.success(`Reacted to comment`)}
        />
      )}
    </div>
  );
};

export default PostItem;
