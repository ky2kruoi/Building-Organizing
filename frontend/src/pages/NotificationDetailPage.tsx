import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getNotificationRecipients, type NotificationRecipient } from '@/services/notificationService';
import { toast } from 'sonner';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { formatUTCToLocal } from '@/lib/formatDate';

const NotificationDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, message, createdAt } = location.state || {};
  
  const [recipients, setRecipients] = useState<NotificationRecipient[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipients = useCallback(async () => {
    if (!title || !message || !createdAt) {
      toast.error('Thông tin thông báo không hợp lệ');
      navigate('/sent-notifications');
      return;
    }

    try {
      setLoading(true);
      const data = await getNotificationRecipients(title, message, createdAt);
      setRecipients(data);
    } catch (error) {
      console.error('Lỗi tải người nhận:', error);
      toast.error('Không thể tải danh sách người nhận');
    } finally {
      setLoading(false);
    }
  }, [createdAt, message, navigate, title]);

  useEffect(() => {
    fetchRecipients();
  }, [fetchRecipients]);

  const formatDate = (dateString: string) => formatUTCToLocal(dateString, 'vi-VN', { second: '2-digit' });

  const readRecipients = recipients.filter(r => r.isRead);
  const unreadRecipients = recipients.filter(r => !r.isRead);

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-gradient-purple" />
      <div className="min-h-screen p-6 md:p-10">
        <div className="max-w-7xl mx-auto">
          <Card className="border-border">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/sent-notifications')}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold">Chi tiết thông báo</h1>
                    <p className="text-base text-muted-foreground mt-1">
                      Xem danh sách người nhận và trạng thái đọc
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={fetchRecipients}
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Làm mới
                  </Button>
                </div>

                {/* Notification Info */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <p className="text-muted-foreground mb-3">{message}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-muted-foreground">
                        📅 Gửi lúc: {createdAt && formatDate(createdAt)}
                      </span>
                      <span className="font-semibold text-green-600">
                        ✅ {readRecipients.length} đã đọc
                      </span>
                      <span className="font-semibold text-orange-600">
                        ⏳ {unreadRecipients.length} chưa đọc
                      </span>
                      <span className="font-semibold">
                        👥 Tổng: {recipients.length} người
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Đang tải...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Read Recipients */}
                    {readRecipients.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Đã đọc ({readRecipients.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {readRecipients.map((recipient) => (
                            <Card key={recipient.notificationId} className="border-green-200 bg-green-50/50">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-semibold">{recipient.User.fullName}</p>
                                    <p className="text-sm text-muted-foreground">
                                      @{recipient.User.username}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {recipient.User.email}
                                    </p>
                                  </div>
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Đọc lúc: {formatDate(recipient.updatedAt)}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Unread Recipients */}
                    {unreadRecipients.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                          <XCircle className="h-5 w-5 text-orange-600" />
                          Chưa đọc ({unreadRecipients.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {unreadRecipients.map((recipient) => (
                            <Card key={recipient.notificationId} className="border-orange-200 bg-orange-50/50">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-semibold">{recipient.User.fullName}</p>
                                    <p className="text-sm text-muted-foreground">
                                      @{recipient.User.username}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {recipient.User.email}
                                    </p>
                                  </div>
                                  <XCircle className="h-5 w-5 text-orange-600" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Gửi lúc: {formatDate(recipient.createdAt)}
                                </p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailPage;
