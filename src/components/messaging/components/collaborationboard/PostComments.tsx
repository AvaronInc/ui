
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Send, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Comment, User } from '../../types';

interface PostCommentsProps {
  postId: string;
  comments: Comment[];
  currentUser: User;
  onAddComment: (content: string) => void;
  onReactToComment: (commentId: string, reaction: string) => void;
}

const PostComments = ({ 
  postId, 
  comments, 
  currentUser, 
  onAddComment, 
  onReactToComment 
}: PostCommentsProps) => {
  const [newComment, setNewComment] = useState('');
  
  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };
  
  return (
    <div className="pt-2 border-t mt-2">
      {/* Comment List */}
      <div className="space-y-3 mb-3">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-2">
            <Avatar className="h-7 w-7 mt-1">
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback>{comment.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-1">
              <div className="bg-muted p-2 rounded-md">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="font-medium text-sm">{comment.author.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {formatDistanceToNow(comment.timestamp)} ago
                    </span>
                  </div>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
              
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 px-2 text-xs gap-1"
                  onClick={() => onReactToComment(comment.id, 'like')}
                >
                  <ThumbsUp size={12} />
                  {comment.reactions[0]?.count > 0 && <span>{comment.reactions[0].count}</span>}
                </Button>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">Reply</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* New Comment */}
      <div className="flex gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 flex items-end gap-2">
          <Textarea 
            placeholder="Write a comment..." 
            className="min-h-[60px] text-sm"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <Button 
            size="icon" 
            className="h-8 w-8 shrink-0" 
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
          >
            <Send size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostComments;
