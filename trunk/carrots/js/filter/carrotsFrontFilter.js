/**
 * Created by Administrator on 2017/5/17.
 */
//薪酬过滤
carrotsFront.filter('compensationFilter',function(){
  return function(type){
	switch (type) {
	  case 0:
		type='8k';
		break;
	  case 1:
		type='8~15K';
		break;
	  case 2:
		type='16~25K';
		break;
	  case 3:
		type='26K以上';
		break;
	}
	return type
  }
});
//城市过滤
carrotsFront.filter('cityFilter',function(CITY){
  return function(city){
	angular.forEach(CITY,function(item){
	  if (city==item.CityID){
		city=item.CityName
	  }
	});
	return city
  }
});
//县市过滤
carrotsFront.filter('countyFilter',function(COUNTY){
  return function(county){
	angular.forEach(COUNTY,function(item){
	  if (county==item.Id){
		county=item.countyName
	  }
	});
	return county
  }
});
//教育程度过滤
carrotsFront.filter('educationFilter',function(con){
  return function(education){
	angular.forEach(con.education,function(item){
	  if (education==item.type){
		education=item.name
	  }
	});
	return education
  }
});
//工作经验过滤
carrotsFront.filter('experienceFilter',function(con){
  return function(experience){
	angular.forEach(con.experience,function(item){
	  if (experience==item.type){
		experience=item.name
	  }
	});
	return experience
  }
});
//公司行业过滤
carrotsFront.filter('industryFilter',function(con){
  return function(industry){
	angular.forEach(con.industry,function(item){
	  if (industry==item.type){
		industry=item.name
	  }
	});
	return industry
  }
});
//融资情况过滤
carrotsFront.filter('financingFilter',function(con){
  return function(financing){
	angular.forEach(con.financing,function(item){
	  if (financing==item.type){
		financing=item.name
	  }
	});
	return financing;
  }
});