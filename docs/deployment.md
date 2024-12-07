# Deployment Guide

## Prerequisites

### 1. Required Access
- GitHub repository access
- AWS account credentials
- Netlify account (for frontend)
- Database connection details

### 2. Required Tools
```bash
# AWS CLI
# Windows:
choco install awscli
# Mac:
brew install awscli

# Configure AWS
aws configure
# Enter your:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region
# - Output format (json)

# Netlify CLI
npm install -g netlify-cli
netlify login
```

## Deployment Process

### Frontend Deployment (Netlify)

#### First-Time Setup
1. Login to Netlify CLI:
   ```bash
   netlify login
   ```

2. Initialize project:
   ```bash
   cd apps/attendance-portal
   netlify init
   ```
   - Choose 'Create & configure a new site'
   - Select team
   - Set site name

3. Configure build settings:
   ```bash
   # Create netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"
     base = "apps/attendance-portal"
   ```

#### Regular Deployment
1. Build project:
   ```bash
   npm run build
   ```

2. Deploy:
   ```bash
   netlify deploy
   ```
   - Preview deployment first
   - Use `--prod` flag for production

3. Verify deployment:
   - Check Netlify dashboard
   - Test deployed site
   - Verify features work

### Backend Deployment (AWS)

#### 1. Prepare Application
```bash
# Build application
npm run build

# Run tests
npm test

# Check environment variables
nano .env.production
```

#### 2. Database Migration
```bash
# Run migrations
npm run typeorm migration:run

# Verify database state
npm run typeorm migration:show
```

#### 3. Deploy to AWS
```bash
# Build Docker image
docker build -t attendance-api .

# Push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com
docker tag attendance-api:latest $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/attendance-api:latest
docker push $AWS_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/attendance-api:latest

# Update ECS service
aws ecs update-service --cluster production --service attendance-api --force-new-deployment
```

## Environment Configuration

### Frontend (.env)
```env
VITE_API_URL=https://api.example.com
VITE_AUTH_DOMAIN=auth.example.com
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
```

## Monitoring Setup

### 1. CloudWatch Logs
1. Open AWS Console
2. Navigate to CloudWatch
3. Select 'Log groups'
4. Find your application logs
5. Set up:
   - Log retention
   - Metric filters
   - Alerts

### 2. Performance Monitoring
1. Open AWS X-Ray
2. View service map
3. Analyze:
   - Response times
   - Error rates
   - Dependencies

### 3. Error Tracking
1. Open Sentry dashboard
2. Navigate to Projects
3. Select your project
4. Monitor:
   - Error rates
   - User impact
   - Performance

## Rollback Procedures

### Frontend Rollback
```bash
# List deployments
netlify deploy --list

# Rollback to previous deployment
netlify deploy --restore --prod $DEPLOY_ID
```

### Backend Rollback
```bash
# Rollback ECS deployment
aws ecs update-service --cluster production --service attendance-api --task-definition attendance-api:$PREVIOUS_VERSION

# Rollback database
npm run typeorm migration:revert
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues
```bash
# Check database connectivity
psql $DATABASE_URL

# View logs
aws logs get-log-events --log-group-name /ecs/attendance-api --log-stream-name $STREAM_NAME
```

#### 2. Application Errors
1. Check application logs:
   ```bash
   netlify logs:app
   aws logs get-log-events
   ```

2. Verify environment variables:
   ```bash
   netlify env:list
   aws ssm get-parameters-by-path
   ```

#### 3. Deployment Failures
1. Check build logs
2. Verify dependencies
3. Test locally:
   ```bash
   npm run build
   npm run preview
   ```

## Security Considerations

### 1. SSL Certificates
- Verify SSL status
- Check expiration dates
- Renew if needed

### 2. Environment Variables
- Rotate secrets regularly
- Use AWS Secrets Manager
- Audit access permissions

### 3. Access Control
- Review IAM roles
- Audit user permissions
- Monitor access logs