package com.sams.service;

import com.sams.dto.MailNotificationDTO;
import java.util.List;

public interface MailNotificationService {
    MailNotificationDTO createMailNotification(MailNotificationDTO dto);
    MailNotificationDTO getMailNotificationById(Long id);
    List<MailNotificationDTO> getAllMailNotifications();
    MailNotificationDTO updateMailNotification(Long id, MailNotificationDTO dto);
    void deleteMailNotification(Long id);
}