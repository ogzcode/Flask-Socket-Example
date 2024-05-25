from app import db


class Block(db.Model):
    __tablename__ = 'block'
    id = db.Column(db.Integer, primary_key=True)
    blocker_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    blocked_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    blocker = db.relationship('User', foreign_keys=[blocker_id], backref=db.backref('blocker', cascade='all, delete-orphan'))
    blocked = db.relationship('User', foreign_keys=[blocked_id], backref=db.backref('blocked', cascade='all, delete-orphan'))

    def __repr__(self):
        return f"<Block {self.blocker_id} blocked {self.blocked_id}>"

    def to_dict(self):
        return {
            "id": self.id,
            "blocker_id": self.blocker_id,
            "blocked_id": self.blocked_id
        }
    
class BlockServices:
    @staticmethod
    def block_user(blocker_id, blocked_id):
        new_block = Block(blocker_id=blocker_id, blocked_id=blocked_id)
        db.session.add(new_block)
        db.session.commit()
        return new_block
    
    @staticmethod
    def is_user_blocked(blocker_id, blocked_id):
        block = Block.query.filter_by(blocker_id=blocker_id, blocked_id=blocked_id).first()
        return block is not None
    
    @staticmethod
    def get_blocked_users(blocker_id):
        blocks = Block.query.filter_by(blocker_id=blocker_id).all()
        return blocks
    
    @staticmethod
    def unblock_user(blocker_id, blocked_id):
        block = Block.query.filter_by(blocker_id=blocker_id, blocked_id=blocked_id).first()
        db.session.delete(block)
        db.session.commit()
        return block