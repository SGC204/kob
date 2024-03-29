package com.kob.backend.service.rank;

import com.alibaba.fastjson2.JSONObject;

public interface GetUserListService {
    JSONObject getList(Integer page);
}
